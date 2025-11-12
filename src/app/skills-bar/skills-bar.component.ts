import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-skills-bar',
  templateUrl: './skills-bar.component.html',
  styleUrls: ['./skills-bar.component.css']
})
export class SkillsBarComponent implements AfterViewInit, OnDestroy {

  skills: string[] = [
    'FRONT-END DEVELOPER', 'TEAM LEADER', '3D PRINTING NERD', 'UI/UX DESIGN', 'CREATIVE THINKER', 'PROBLEM SOLVER'
  ];

  // dubbele lijst voor oneindige scroll
  tickerList = [...this.skills, ...this.skills];

  @ViewChild('ticker', { static: true }) tickerRef!: ElementRef<HTMLDivElement>;

  // huidige translateX in pixels (positief value = how far we've scrolled)
  private offset = 0;
  private tickIntervalId: any = null;
  private isPaused = false;

  // totale breedte (in px) van de originele (niet-gedupliceerde) rij
  private originalWidth = 0;

  // touch handling
  private touchStartX = 0;
  private touchCurrentX = 0;
  private isTouching = false;

  // snelheid: tijd tussen stappen in ms
  stepDelay = 3500;

  // animatie duur (in ms) — dit moet overeenkomen met CSS transition
  private transitionMs = 500;

  ngAfterViewInit(): void {
    // bereken maten en start ticker
    setTimeout(() => {
      this.calculateWidths();
      this.startTicker();
    }, 0);

    // herbereken bij resize
    window.addEventListener('resize', this.onWindowResize);
  }

  ngOnDestroy(): void {
    this.stopTicker();
    window.removeEventListener('resize', this.onWindowResize);
  }

  private onWindowResize = () => {
    // stop, recalc en herstart zodat alles netjes blijft
    this.stopTicker();
    this.offset = 0;
    this.applyTransform(false);
    setTimeout(() => {
      this.calculateWidths();
      this.startTicker();
    }, 100);
  }

  private calculateWidths() {
    const tickerEl = this.tickerRef.nativeElement;
    const children = Array.from(tickerEl.children) as HTMLElement[];

    // som van breedtes van de eerste N originele items (skills.length)
    this.originalWidth = 0;
    for (let i = 0; i < this.skills.length; i++) {
      const child = children[i];
      if (child) this.originalWidth += child.getBoundingClientRect().width;
    }

    // safety: als originalWidth 0 is (nog niet gerenderd) fallback op container width
    if (!this.originalWidth) {
      this.originalWidth = tickerEl.getBoundingClientRect().width;
    }
  }

  private startTicker() {
    if (this.tickIntervalId) return;
    this.tickIntervalId = setInterval(() => {
      if (!this.isPaused && !this.isTouching) {
        this.stepOnce();
      }
    }, this.stepDelay);
  }

  private stopTicker() {
    if (this.tickIntervalId) {
      clearInterval(this.tickIntervalId);
      this.tickIntervalId = null;
    }
  }

  private stepOnce() {
    // verplaats naar links met breedte van het eerstvolgende element
    const tickerEl = this.tickerRef.nativeElement;
    const children = Array.from(tickerEl.children) as HTMLElement[];

    // bepaal breedte van het volgende item (dit is in pixels)
    // we gebruiken modulo zodat we altijd refereren aan het "visuele" eerste element
    const nextIndex = this.getFirstVisibleIndex();
    const nextWidth = children[nextIndex]?.getBoundingClientRect().width || 0;

    // verhoog offset
    this.offset += nextWidth;
    // overgang animatie aanzetten (CSS gebruikt transition maar we forceren via inline style)
    this.applyTransform(true);

    // wanneer we over de originele breedte heen gaan, reset offset (na de animatie) zodat loop vloeiend is
    if (this.offset >= this.originalWidth) {
      // na de transition, reset offset -= originalWidth zonder transition zodat het onzichtbaar doorloopt
      setTimeout(() => {
        this.offset -= this.originalWidth;
        this.applyTransform(false); // zonder animatie
      }, this.transitionMs + 20); // kleine buffer
    }
  }

  // berekent index van array-child die visueel als eerste staat (op basis van huidige offset)
  private getFirstVisibleIndex() {
    const tickerEl = this.tickerRef.nativeElement;
    const children = Array.from(tickerEl.children) as HTMLElement[];

    // loop door children vanuit 0 en zoek eerste item waarvan cumulatieve breedte > offset vrij simpel
    let cumulative = 0;
    for (let i = 0; i < this.tickerList.length; i++) {
      const w = children[i]?.getBoundingClientRect().width || 0;
      if (this.offset < cumulative + w) {
        return i;
      }
      cumulative += w;
      // note: tickerList is dubbel zo lang als skills; dit is ok
    }
    return 0;
  }

  private applyTransform(withTransition: boolean) {
    const el = this.tickerRef.nativeElement;
    if (withTransition) {
      el.style.transition = `transform ${this.transitionMs}ms ease`;
    } else {
      el.style.transition = 'none';
    }
    // negatieve translate omdat we naar links willen schuiven
    el.style.transform = `translateX(-${this.offset}px)`;
  }

  // ========== Hover (desktop) ==========
  onMouseEnter() {
    this.isPaused = true;
  }
  onMouseLeave() {
    this.isPaused = false;
  }

  // ========== Touch / Swipe ==========
  onTouchStart(ev: TouchEvent) {
    this.isTouching = true;
    this.touchStartX = ev.touches[0].clientX;
    this.touchCurrentX = this.touchStartX;
    // pauzeer ticker tijdens aanraken
    this.isPaused = true;
    // stop eventuele transition to allow smooth dragging
    this.tickerRef.nativeElement.style.transition = 'none';
  }

  onTouchMove(ev: TouchEvent) {
    if (!this.isTouching) return;
    this.touchCurrentX = ev.touches[0].clientX;
    const dx = this.touchStartX - this.touchCurrentX; // positive = swipe left
    // visual drag: offset = origineel offset + dx
    const visualOffset = Math.max(0, this.offset + dx);
    this.tickerRef.nativeElement.style.transform = `translateX(-${visualOffset}px)`;
  }

  onTouchEnd() {
    if (!this.isTouching) return;
    const dx = this.touchStartX - this.touchCurrentX;
    const tickThreshold = 30; // minimale px swipe om 1 stap te forceren

    // restore transition
    this.tickerRef.nativeElement.style.transition = `transform ${this.transitionMs}ms ease`;

    if (Math.abs(dx) > tickThreshold) {
      // als swipe naar links (dx positive) -> één of meerdere stappen vooruit (op basis van swipe)
      if (dx > 0) {
        // probeer zoveel stappen te doen als passt: greedily consume widths
        this.consumeSwipe(dx);
      } else {
        // swipe naar rechts -> back-step (kleine implementatie: stap 1 terug)
        // we voorkomen negatieve offset
        this.rewindOneStep();
      }
    } else {
      // geen sterke swipe: terug naar normale offset
      this.applyTransform(true);
    }

    this.isTouching = false;
    this.isPaused = false;
  }

  // consume swipe distance and advance accordingly
  private consumeSwipe(distancePx: number) {
    const tickerEl = this.tickerRef.nativeElement;
    const children = Array.from(tickerEl.children) as HTMLElement[];

    // probeer zoveel volgende items toe te voegen totdat distancePx is opgebruikt
    let remaining = distancePx;
    let nextIndex = this.getFirstVisibleIndex();
    while (remaining > 0) {
      const w = children[nextIndex]?.getBoundingClientRect().width || 0;
      if (w === 0) break;
      this.offset += w;
      remaining -= w;
      nextIndex = (nextIndex + 1) % children.length;
      // als we passeren originalWidth, pas reset toe zoals bij normale stap
      if (this.offset >= this.originalWidth) {
        // we doen de reset direct (animatie nog steeds zal afspelen)
        this.offset -= this.originalWidth;
        // break; // we kunnen door blijven gaan, maar offset is nu binnen range
      }
    }

    this.applyTransform(true);
  }

  private rewindOneStep() {
    // voor simpelheid: loop children backward en vind breedte van vorige item
    const tickerEl = this.tickerRef.nativeElement;
    const children = Array.from(tickerEl.children) as HTMLElement[];

    // bepaal welke child visueel als eerste is en ga 1 terug
    let firstIndex = this.getFirstVisibleIndex();
    // als index 0, zet naar laatste van originele (via +skills.length-1)
    let prevIndex = firstIndex - 1;
    if (prevIndex < 0) prevIndex += children.length;
    const w = children[prevIndex]?.getBoundingClientRect().width || 0;

    // voorkom dat offset onder 0 duikt: als offset < w dan we moeten 'vooruit' met originalWidth-buffer
    if (this.offset < w) {
      // zet offset += originalWidth en daarna - w
      this.offset += this.originalWidth;
      this.offset -= w;
    } else {
      this.offset -= w;
    }
    this.applyTransform(true);

    // als we door de originalWidth heen gingen, reset zoals gewoonlijk
    if (this.offset >= this.originalWidth) {
      setTimeout(() => {
        this.offset -= this.originalWidth;
        this.applyTransform(false);
      }, this.transitionMs + 20);
    }
  }
}
