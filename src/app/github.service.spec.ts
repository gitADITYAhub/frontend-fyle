// src/app/github.service.spec.ts

import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService]
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve repositories for a specific user', () => {
    const mockRepositories = [
      { id: 1, name: 'Repo1' },
      { id: 2, name: 'Repo2' }
    ];

    service.getRepositories('user1').subscribe(repos => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(mockRepositories);
    });

    const request = httpMock.expectOne(`${service.baseURL}/user1/repos`);
    expect(request.request.method).toBe('GET');
    request.flush(mockRepositories);
  });
});
