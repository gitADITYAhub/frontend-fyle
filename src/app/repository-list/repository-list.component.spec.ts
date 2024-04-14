// src/app/repository-list/repository-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepositoryListComponent } from './repository-list.component';
import { GithubService } from '../github.service';
import { of } from 'rxjs';

describe('RepositoryListComponent', () => {
  let component: RepositoryListComponent;
  let fixture: ComponentFixture<RepositoryListComponent>;
  let githubService: GithubService;

  beforeEach(async () => {
    const githubServiceStub = {
      getRepositories: (username: string) => of([
        { id: 1, name: 'Repo1' },
        { id: 2, name: 'Repo2' }
      ])
    };

    await TestBed.configureTestingModule({
      declarations: [ RepositoryListComponent ],
      providers: [ { provide: GithubService, useValue: githubServiceStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryListComponent);
    component = fixture.componentInstance;
    githubService = TestBed.inject(GithubService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of repositories', () => {
    component.username = 'user1';
    expect(component.repositories.length).toBe(2);
  });
});
