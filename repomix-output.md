This file is a merged representation of the entire codebase, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
src/
  app/
    authentication/
      authentication-api.spec.ts
      authentication-api.ts
    components/
      home-page/
        home-page.html
        home-page.spec.ts
        home-page.ts
      login-page/
        login-page.html
        login-page.spec.ts
        login-page.ts
      picture-details/
        picture-details.html
        picture-details.spec.ts
        picture-details.ts
      register-page/
        register-page.html
        register-page.spec.ts
        register-page.ts
    interceptors/
      global-interceptor.spec.ts
      global-interceptor.ts
    services/
      comment-api.spec.ts
      comment-api.ts
      picture-api.spec.ts
      picture-api.ts
      user-api.spec.ts
      user-api.ts
    shared/
      card-component/
        card.component.html
        card.component.spec.ts
        card.component.ts
      footer/
        footer.html
        footer.spec.ts
        footer.ts
      header/
        header.html
        header.spec.ts
        header.ts
    app.config.ts
    app.html
    app.routes.ts
    app.spec.ts
    app.ts
    interfaces.ts
  environments/
    environment.development.ts
    environment.ts
  index.html
  main.ts
  styles.css
.editorconfig
.gitignore
angular.json
package.json
README.md
tsconfig.app.json
tsconfig.json
tsconfig.spec.json
```

# Files

## File: src/app/authentication/authentication-api.spec.ts
````typescript
import { TestBed } from '@angular/core/testing';

import { AuthenticationApi } from './authentication-api';

describe('AuthenticationApi', () => {
  let service: AuthenticationApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
````

## File: src/app/authentication/authentication-api.ts
````typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApi {
  
}
````

## File: src/app/components/home-page/home-page.html
````html
<h1 class="text-center">Welcome to our Picture App</h1>

<div class="p-3">
  @if (picturePage.isLoading()) {
    <div class="card" aria-hidden="true">
      <img src="#" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title placeholder-glow">
          <span class="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span class="placeholder col-7"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-4"></span>
          <span class="placeholder col-6"></span>
          <span class="placeholder col-8"></span>
        </p>
        <a class="btn btn-dark disabled placeholder col-6" aria-disabled="true"></a>
      </div>
    </div>
  } @else {
    @if (!picturePage.hasValue()) {
      <p>No pictures found.</p>
    } @else {
      <div class="row g-4">
        @for (picture of picturePage.value().content; track $index) {
          <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
            <app-card-component [title]="picture.title"
                                [authorName]="picture.author.displayName"
                                [authorLink]="environment.frontUrl + '/author/' + picture.author.id"
                                [date]="picture.createdAt"
                                [image]="picture.image"
                                [link]="environment.frontUrl + '/picture/' + picture.id">
            </app-card-component>
          </div>
        }
      </div>
    }
  }

<!--  PAGINATION -->
  @if (picturePage.hasValue() && picturePage.value()!.totalPages > 1) {
    <nav aria-label="Page navigation" class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" [class.disabled]="picturePage.value()!.first">
          <button class="page-link" (click)="goToPreviousPage()" [disabled]="picturePage.value()!.first">
            Previous
          </button>
        </li>

        @for (pageNum of getPageNumbers(); track pageNum) {
          <li class="page-item" [class.active]="pageNum === currentPage()">
            <button class="page-link" (click)="navigateToPage(pageNum)">
              {{ pageNum }}
            </button>
          </li>
        }

        <li class="page-item" [class.disabled]="picturePage.value()!.last">
          <button class="page-link" (click)="goToNextPage()" [disabled]="picturePage.value()!.last">
            Next
          </button>
        </li>
      </ul>
    </nav>
  }
</div>
````

## File: src/app/components/home-page/home-page.spec.ts
````typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home-page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
````

## File: src/app/components/home-page/home-page.ts
````typescript
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
  protected readonly picturePage = this.pictureApi.getPageOfCards(this.currentPage);

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
````

## File: src/app/components/login-page/login-page.html
````html
<p>login-page works!</p>
````

## File: src/app/components/login-page/login-page.spec.ts
````typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login-page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
````

## File: src/app/components/login-page/login-page.ts
````typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export class LoginPage {

}
````

## File: src/app/components/picture-details/picture-details.html
````html
<div class="container mt-5 mb-5">
  <div class="row justify-content-center">
    <div class="col-lg-10 col-xl-8">
      @if (picture.isLoading()) {
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      } @else if (picture.hasValue()) {
        <div class="card shadow-sm">
          <div class="row g-0">
            <!-- Image Section -->
            <div class="col-md-8">
              <img [src]="picture.value().image"
                   [alt]="picture.value().title"
                   class="img-fluid w-100"
                   style="object-fit: cover; max-height: 600px;">
            </div>

            <!-- Details Section -->
            <div class="col-md-4">
              <div class="card-body d-flex flex-column h-100">
                <!-- Author Info -->
                <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <div class="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                       style="width: 40px; height: 40px;">
                    {{ picture.value().author.displayName.charAt(0).toUpperCase() }}
                  </div>
                  <div class="ms-3">
                    <a [href]="'/author/' + picture.value().author.id" class="text-decoration-none text-dark fw-semibold">
                      {{ picture.value().author.displayName }}
                    </a>
                  </div>
                </div>

                <!-- Title and Description -->
                <div class="flex-grow-1">
                  <h5 class="card-title mb-3">{{ picture.value().title }}</h5>
                  <p class="card-text text-muted">{{ picture.value().description }}</p>
                </div>

                <!-- Date -->
                <div class="text-muted small mb-3">
                  Posted {{ picture.value().createdAt | date:'MMM d, y, h:mm a' }}
                </div>

                <!-- Like Button and Count -->
                <div class="d-flex align-items-center justify-content-between border-top pt-3">
                  <button class="btn btn-outline-danger d-flex align-items-center"
                          (click)="toggleLike()">
                    <span class="me-2">♥</span>
                    Like
                  </button>
                  <span class="text-muted">
                    <strong>42</strong> likes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      } @else {
        <div class="alert alert-warning" role="alert">
          Picture not found
        </div>
      }
    </div>
  </div>
</div>
````

## File: src/app/components/picture-details/picture-details.spec.ts
````typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureDetails } from './picture-details';

describe('PictureDetails', () => {
  let component: PictureDetails;
  let fixture: ComponentFixture<PictureDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PictureDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
````

## File: src/app/components/picture-details/picture-details.ts
````typescript
import {Component, inject, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {PictureApi} from '../../services/picture-api';

@Component({
  selector: 'app-picture-details',
  imports: [DatePipe],
  templateUrl: './picture-details.html',
  styleUrl: './picture-details.css'
})
export class PictureDetails {
  protected readonly pictureApi = inject(PictureApi);

  readonly id = input<string>('');
  readonly picture = this.pictureApi.getOnePicture(this.id());

  toggleLike() {
    // TODO: Implement like functionality
    console.log('Like clicked');
  }

}
````

## File: src/app/components/register-page/register-page.html
````html
<p>register-page works!</p>
````

## File: src/app/components/register-page/register-page.spec.ts
````typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPage } from './register-page';

describe('RegisterPage', () => {
  let component: RegisterPage;
  let fixture: ComponentFixture<RegisterPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
````

## File: src/app/components/register-page/register-page.ts
````typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-register-page',
  imports: [],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export class RegisterPage {

}
````

## File: src/app/interceptors/global-interceptor.spec.ts
````typescript
import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn } from '@angular/common/http';

import { globalInterceptor } from './global-interceptor';

describe('globalInterceptor', () => {
  const interceptor: HttpInterceptorFn = (req, next) => 
    TestBed.runInInjectionContext(() => globalInterceptor(req, next));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
````

## File: src/app/interceptors/global-interceptor.ts
````typescript
import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from '../../environments/environment.development';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  const clone = req.clone({
    url: req.url.startsWith('http') ? req.url : environment.apiUrl + req.url
  });
  return next(clone);
};
````

## File: src/app/services/comment-api.spec.ts
````typescript
import { TestBed } from '@angular/core/testing';

import { CommentApi } from './comment-api';

describe('CommentApi', () => {
  let service: CommentApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
````

## File: src/app/services/comment-api.ts
````typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentApi {
  
}
````

## File: src/app/services/picture-api.spec.ts
````typescript
import { TestBed } from '@angular/core/testing';

import { PictureApi } from './picture-api';

describe('PictureApi', () => {
  let service: PictureApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PictureApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
````

## File: src/app/services/picture-api.ts
````typescript
import {inject, Injectable, Signal} from '@angular/core';
import {HttpClient, httpResource} from '@angular/common/http';
import {environment} from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PictureApi {
  protected readonly httpClient = inject(HttpClient);

  getPageOfCards(page: Signal<number | undefined>) {
    return httpResource<Page<Picture>>(
      () => {
        const pageNumber = page() ?? 1;
        return environment.apiUrl + `/api/picture?pageNumber=${pageNumber - 1}`;
      }
    );
  }

  getOnePicture(id: string) {
    return httpResource<Picture>(
      () => environment.apiUrl + `/api/picture/${id}`
    );
  }

}
````

## File: src/app/services/user-api.spec.ts
````typescript
import { TestBed } from '@angular/core/testing';

import { UserApi } from './user-api';

describe('UserApi', () => {
  let service: UserApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
````

## File: src/app/services/user-api.ts
````typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserApi {
  
}
````

## File: src/app/shared/card-component/card.component.html
````html
<div class="card" style="width: 18rem;">
  @if (image()) {
    <img [src]="image()!" class="card-img-top" [alt]="title() || 'Card image'">
  }
  <div class="card-body">
    @if (title()) {
      <h5 class="card-title">{{ title() }}</h5>
    }
    @if (authorName() || date()) {
      <div class="card-meta text-muted small mb-2">
        @if (authorName()) {
          <span class="author">By {{ authorName() }}</span>
        }
        @if (authorName() && date()) {
          <span> • </span>
        }
        @if (date()) {
          <span class="date">{{ formattedDate() }}</span>
        }
      </div>
    }
    <div class="d-flex justify-content-between align-items-center">
      <div class="likes-counter">
        <span class="heart me-1" style="color: red; cursor: pointer;">♥</span>
        <span>42</span>
      </div>
      @if (link()) {
        <a [href]="link()" class="btn btn-dark btn-sm">More details</a>
      }
    </div>
  </div>
</div>
````

## File: src/app/shared/card-component/card.component.spec.ts
````typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComponent } from './card.component';

describe('Card', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
````

## File: src/app/shared/card-component/card.component.ts
````typescript
import {Component, input, computed} from '@angular/core';

@Component({
  selector: 'app-card-component',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  readonly title = input<string>();
  readonly image = input<string>();
  readonly link = input<string>();
  readonly authorName = input<string>();
  readonly authorLink = input<string>();
  readonly date = input<string | Date>();

  readonly formattedDate = computed(() => {
    const dateValue = this.date();
    if (!dateValue) return '';

    const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
    if (isNaN(date.getTime())) return dateValue.toString();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  });
}
````

## File: src/app/shared/footer/footer.html
````html
<footer class="footer bg-dark text-light py-4 mt-auto">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <p class="mb-0">&copy; 2025 Picture App</p>
      </div>
      <div class="col-md-6 text-md-end">
        <p class="mb-0">Made in 🇫🇷️</p>
      </div>
    </div>
  </div>
</footer>
````

## File: src/app/shared/footer/footer.spec.ts
````typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
````

## File: src/app/shared/footer/footer.ts
````typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

}
````

## File: src/app/shared/header/header.html
````html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <div class="d-flex w-100 align-items-center">
        <div class="flex-grow-1"></div>
        <ul class="navbar-nav">
          @for (link of links(); track $index) {
            <li class="nav-item">
              <a class="nav-link" routerLink="{{link.path}}" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">{{link.name}}</a>
            </li>
          }
        </ul>
        <div class="flex-grow-1 d-flex justify-content-end">
          <button class="btn btn-light">
            <i class="bi bi-person-circle fs-4"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</nav>
````

## File: src/app/shared/header/header.spec.ts
````typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
````

## File: src/app/shared/header/header.ts
````typescript
import {Component, signal} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

interface Link {
  name: string;
  path: string;
}

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  //protected readonly authenticatedApi = signal(AuthenticationApi);

  protected readonly links = signal<Link[]>([
    {name: 'Home', path: '/'},
    {name: 'Register', path: '/register'},
    {name: 'Login', path: '/login'}
  ]);
}
````

## File: src/app/app.config.ts
````typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';

function globalInterceptor() {

}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([]))
  ]
};
````

## File: src/app/app.html
````html
<app-header/>
<router-outlet />
<app-footer/>
````

## File: src/app/app.routes.ts
````typescript
import { Routes } from '@angular/router';
import {HomePage} from './components/home-page/home-page';
import {PictureDetails} from './components/picture-details/picture-details';

export const routes: Routes = [
  {path: '', component: HomePage},
  {path: 'picture/:id', component: PictureDetails},
];
````

## File: src/app/app.spec.ts
````typescript
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, picture-app-eval');
  });
});
````

## File: src/app/app.ts
````typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './shared/header/header';
import {Footer} from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('picture-app-eval');
}
````

## File: src/app/interfaces.ts
````typescript
interface Author {
  id: number;
  displayName: string;
}

interface Picture {
  id: number;
  image: string;
  description: string;
  title: string;
  author: Author;
  createdAt: Date;
}

interface User {
  id: number;
  email: string;
  displayName: string;
  password: string;
  role: string;
}

interface Comment {
  id: number;
  content: string;
  createdAt: Date;
}

interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
````

## File: src/environments/environment.development.ts
````typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',
  frontUrl: 'http://localhost:4200'
};
````

## File: src/environments/environment.ts
````typescript
export const environment = {};
````

## File: src/index.html
````html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>PictureAppEval</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
</head>
<body>
  <app-root></app-root>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</body>
</html>
````

## File: src/main.ts
````typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
````

## File: src/styles.css
````css
/* You can add global styles to this file, and also import other style files */
````

## File: .editorconfig
````
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single
ij_typescript_use_double_quotes = false

[*.md]
max_line_length = off
trim_trailing_whitespace = false
````

## File: .gitignore
````
# See https://docs.github.com/get-started/getting-started-with-git/ignoring-files for more about ignoring files.

# Compiled output
/dist
/tmp
/out-tsc
/bazel-out

# Node
/node_modules
npm-debug.log
yarn-error.log

# IDEs and editors
.idea/
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# Visual Studio Code
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
.history/*

# Miscellaneous
/.angular/cache
.sass-cache/
/connect.lock
/coverage
/libpeerconnection.log
testem.log
/typings

# System files
.DS_Store
Thumbs.db
.claude/

SPECIFICATIONS.md
````

## File: angular.json
````json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "picture-app-eval": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/build:application",
          "options": {
            "browser": "src/main.ts",
            "polyfills": [
              "zone.js"
            ],
            "tsConfig": "tsconfig.app.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ]
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kB",
                  "maximumError": "1MB"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "4kB",
                  "maximumError": "8kB"
                }
              ],
              "outputHashing": "all"
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.development.ts"
                }
              ]
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular/build:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "picture-app-eval:build:production"
            },
            "development": {
              "buildTarget": "picture-app-eval:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "extract-i18n": {
          "builder": "@angular/build:extract-i18n"
        },
        "test": {
          "builder": "@angular/build:karma",
          "options": {
            "polyfills": [
              "zone.js",
              "zone.js/testing"
            ],
            "tsConfig": "tsconfig.spec.json",
            "assets": [
              {
                "glob": "**/*",
                "input": "public"
              }
            ],
            "styles": [
              "src/styles.css"
            ]
          }
        }
      }
    }
  }
}
````

## File: package.json
````json
{
  "name": "picture-app-eval",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "prettier": {
    "printWidth": 100,
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.html",
        "options": {
          "parser": "angular"
        }
      }
    ]
  },
  "private": true,
  "dependencies": {
    "@angular/common": "^20.2.0",
    "@angular/compiler": "^20.2.0",
    "@angular/core": "^20.2.0",
    "@angular/forms": "^20.2.0",
    "@angular/platform-browser": "^20.2.0",
    "@angular/router": "^20.2.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.15.0"
  },
  "devDependencies": {
    "@angular/build": "^20.2.2",
    "@angular/cli": "^20.2.2",
    "@angular/compiler-cli": "^20.2.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.9.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.9.2"
  }
}
````

## File: README.md
````markdown
# PictureAppEval

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
````

## File: tsconfig.app.json
````json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/app",
    "types": []
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "src/**/*.spec.ts"
  ]
}
````

## File: tsconfig.json
````json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "compileOnSave": false,
  "compilerOptions": {
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "module": "preserve"
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "typeCheckHostBindings": true,
    "strictTemplates": true
  },
  "files": [],
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.spec.json"
    }
  ]
}
````

## File: tsconfig.spec.json
````json
/* To learn more about Typescript configuration file: https://www.typescriptlang.org/docs/handbook/tsconfig-json.html. */
/* To learn more about Angular compiler options: https://angular.dev/reference/configs/angular-compiler-options. */
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": [
      "jasmine"
    ]
  },
  "include": [
    "src/**/*.ts"
  ]
}
````
