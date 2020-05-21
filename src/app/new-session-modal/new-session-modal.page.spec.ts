import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewSessionModalPage } from './new-session-modal.page';

describe('NewSessionModalPage', () => {
  let component: NewSessionModalPage;
  let fixture: ComponentFixture<NewSessionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSessionModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewSessionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
