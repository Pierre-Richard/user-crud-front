import { MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';

export interface RequestState {
  isLoading: boolean;
  errorMessage: string | null;
  successMessage: string | null;
}
