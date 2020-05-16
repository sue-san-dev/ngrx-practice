import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseActions } from './action-type';
import { concatMap, map } from 'rxjs/operators';
import { CoursesHttpService } from './services/courses-http.service';
import { allCoursesLoaded } from './course.actions';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CourseActions.loadAllCourses),
      concatMap(action => {
        return this.coursesHttpService.findAllCourses();
      }),
      map(courses => allCoursesLoaded({ courses }))
    );
  });

  saveCourse$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(CourseActions.courseUpdated),
        concatMap(action => {
          return this.coursesHttpService.saveCourse(
            action.update.id,
            action.update.changes
          );
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesHttpService: CoursesHttpService
  ) {}
}
