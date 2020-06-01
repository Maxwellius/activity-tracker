import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditSessionModalPage } from './edit-session-modal.page';

describe('EditSessionModalPage', () => {
  let component: EditSessionModalPage;
  let fixture: ComponentFixture<EditSessionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSessionModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditSessionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
