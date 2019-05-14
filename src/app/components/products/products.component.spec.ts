import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ProductsComponent } from './products.component';
import { ProductService } from 'src/app/services/product.service';
import { of, Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';


class MockProductService extends ProductService {
  fetchProducts(): Observable<any[]> {
    return of(['test', 'test2'])
  }
}

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let testBedService: ProductService;
  let componentService: ProductService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // Configure the component with another set of Providers
  TestBed.overrideComponent(
    ProductsComponent,
    { set: { providers: [{ provide: ProductService, useClass: MockProductService }] } }
  );

  // ProductService provided to the TestBed
  testBedService = TestBed.get(ProductService);

  //ProductService provided by Component, (should return MockAuthService)
  componentService = fixture.debugElement.injector.get(ProductService);


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
    inject([ProductService], (injectService: ProductService) => {
      expect(injectService).toBe(testBedService);
    })
  );

  it('Service injected via component should be and instance of MockProductService', () => {
    expect(componentService instanceof MockProductService).toBeTruthy();
  });
});
