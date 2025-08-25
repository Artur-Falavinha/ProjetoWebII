import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AuthService } from '../../../services/auth/auth.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    mockAuthService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with navigation items', () => {
    expect(component.navigationItems).toHaveSize(2);
    expect(component.navigationItems[0].path).toBe('/');
    expect(component.navigationItems[1].path).toBe('/nova-solicitacao');
  });

  it('should initialize with user profile', () => {
    expect(component.userProfile).toBeDefined();
    expect(component.userProfile.name).toBe('Nome User login');
    expect(component.userProfile.email).toBe('user@email.com');
  });

  it('should call ngOnInit and load user profile', () => {
    spyOn(component as any, 'loadUserProfile');
    
    component.ngOnInit();
    
    expect((component as any).loadUserProfile).toHaveBeenCalled();
  });

  it('should logout and navigate to login on logout click', () => {
    component.onLogout();
    
    expect(mockAuthService.logout).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
  });

  it('should render navigation items in template', () => {
    fixture.detectChanges();
    
    const navItems = fixture.nativeElement.querySelectorAll('.nav-item');
    expect(navItems.length).toBe(2);
    expect(navItems[0].textContent.trim()).toContain('Página Inicial');
    expect(navItems[1].textContent.trim()).toContain('Nova Solicitação');
  });

  it('should render user profile information', () => {
    fixture.detectChanges();
    
    const userName = fixture.nativeElement.querySelector('.user-name');
    const userEmail = fixture.nativeElement.querySelector('.user-email');
    
    expect(userName.textContent).toBe('Nome User login');
    expect(userEmail.textContent).toBe('user@email.com');
  });

  it('should trigger logout when logout button is clicked', () => {
    spyOn(component, 'onLogout');
    fixture.detectChanges();
    
    const logoutBtn = fixture.nativeElement.querySelector('.logout-btn');
    logoutBtn.click();
    
    expect(component.onLogout).toHaveBeenCalled();
  });
});