import { provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { delay, of } from 'rxjs';
import { TaskForm } from './task-form';
import { TasksStateService } from '../tasks.state.service';
import { UniqueTitleValidator } from '../../core/validators/unique-title.validator';

function tickAsync(delayMs = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

fdescribe('TaskForm', () => {
  let component: TaskForm;
  let fixture: ComponentFixture<TaskForm>;
  let mockTasksStateService: jasmine.SpyObj<TasksStateService>;
  let mockUniqueTitleValidator: jasmine.SpyObj<UniqueTitleValidator>;

  beforeEach(() => {
    mockTasksStateService = jasmine.createSpyObj('TasksStateService', ['addTask'], {
      isAdding: signal(false),
      addError: signal(null),
    });

    mockTasksStateService.addTask.and.returnValue(of({} as any));
    mockUniqueTitleValidator = jasmine.createSpyObj('UniqueTitleValidator', ['validate']);
    mockUniqueTitleValidator.validate.and.returnValue(of(null));
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskForm, ReactiveFormsModule],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TasksStateService, useValue: mockTasksStateService },
        { provide: UniqueTitleValidator, useValue: mockUniqueTitleValidator },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskForm);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('doit créer le composant', () => {
    expect(component).toBeTruthy();
  });

  it('doit activer le bouton de soumission quand le formulaire est valide', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
    const titleInput = fixture.nativeElement.querySelector('#title');
    titleInput.value = 'Un titre valide';
    titleInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(submitButton.disabled).toBeFalse();
  });

  it('doit appeler la méthode addTask du service lors de la soumission du formulaire', () => {
    const titleInput = fixture.nativeElement.querySelector('#title');
    titleInput.value = 'Titre de test';
    titleInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');

    submitButton.click();
    fixture.detectChanges();

    expect(mockTasksStateService.addTask).toHaveBeenCalledOnceWith({
      title: 'Titre de test',
      description: '',
      status: 'TODO',
    });
  });

  it('doit afficher un message d\'erreur si la description contient un mot interdit et que le champ a été "touché"', () => {
    const descriptionInput = fixture.nativeElement.querySelector('#description');
    descriptionInput.value = 'Je vais faire de la procrastination';
    descriptionInput.dispatchEvent(new Event('input'));
    descriptionInput.dispatchEvent(new Event('blur')); // On simule le "blur" pour passer le champ en "touched"
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('small');
    expect(errorElement.textContent).toContain('Le mot "procrastination" est interdit.');
  });

  it('doit afficher un message d\'erreur si le titre est déjà pris et que le champ a été "touché"', async () => {
    mockUniqueTitleValidator.validate.and.returnValue(of({ uniqueTitle: true }).pipe(delay(0)));

    const titleInput = fixture.nativeElement.querySelector('#title');
    titleInput.value = 'Un titre déjà pris';
    titleInput.dispatchEvent(new Event('input'));
    titleInput.dispatchEvent(new Event('blur'));
    
    await tickAsync(0);
    await fixture.whenStable();
    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Ce titre est déjà pris.');
  });
});
