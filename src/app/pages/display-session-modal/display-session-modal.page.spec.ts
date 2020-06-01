import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisplaySessionModalPage } from './display-session-modal.page';

describe('DisplaySessionModalPage', () => {
  let component: DisplaySessionModalPage;
  let fixture: ComponentFixture<DisplaySessionModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaySessionModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplaySessionModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
