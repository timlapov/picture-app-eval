import {Component, inject, signal, computed, effect} from '@angular/core';
import {CardComponent} from '../../shared/card-component/card.component';
import {PictureApi} from '../../services/picture-api';
import {environment} from '../../../environments/environment.development';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  imports: [
    CardComponent
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  protected readonly pictureApi = inject(PictureApi);

  protected readonly currentPage = signal(1);
  protected readonly picturePage = this.pictureApi.getPageOfPictures(this.currentPage);

  protected readonly environment = environment;

  constructor() {
    // Get page number from query parameters
    effect(() => {
      this.route.queryParams.subscribe(params => {
        const pageParam = params['page'];
        const page = pageParam ? Number(pageParam) : 1;

        // Validate page number
        if (page > 0 && !isNaN(page)) {
          this.currentPage.set(page);
        } else {
          this.navigateToPage(1);
        }
      });
    });

    // Validate page boundaries after data loading
    effect(() => {
      const pageData = this.picturePage.value();
      if (pageData && this.currentPage() > pageData.totalPages && pageData.totalPages > 0) {
        this.navigateToPage(pageData.totalPages);
      }
    });
  }

  protected navigateToPage(page: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page === 1 ? null : page },
      queryParamsHandling: 'merge'
    });
  }

  protected goToPreviousPage(): void {
    const pageData = this.picturePage.value();
    if (pageData && !pageData.first) {
      this.navigateToPage(this.currentPage() - 1);
    }
  }

  protected goToNextPage(): void {
    const pageData = this.picturePage.value();
    if (pageData && !pageData.last) {
      this.navigateToPage(this.currentPage() + 1);
    }
  }

  protected getPageNumbers(): number[] {
    const pageData = this.picturePage.value();
    if (!pageData) return [];

    const totalPages = pageData.totalPages;
    const current = this.currentPage();
    const pages: number[] = [];

    // Show up to 5 pages around the current one
    const start = Math.max(1, current - 2);
    const end = Math.min(totalPages, current + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
