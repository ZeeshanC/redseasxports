import { ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/core/dialog/dialog.component';


export interface IDialogData {
  title: string;
  content?: any;
  contentClass?: string;
  footer?: any;
  footerClass?: string;
  type?: any;
  deleteMsg?: any;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogRef: MatDialogRef<DialogComponent> | any;

  matDialog = inject(MatDialog);
  constructor() {}

  openDialog<T>(component: ComponentType<T>, matConfig: MatDialogConfig){
    return this.matDialog.open(component, {
      ...matConfig
    });
  }

  closeDialog() {
    this.matDialog.closeAll();
  }

  openDialogViaTemplate(templateRef: TemplateRef<any>, config: MatDialogConfig): any {
    this.dialogRef = this.matDialog.open(templateRef, {
      height: config.height,
      width: config.width,
      maxHeight: config.maxHeight || 'auto',
      maxWidth: config.maxWidth || 'auto',
      data: config.data || '',
      disableClose: config.disableClose || false,
      panelClass: config.panelClass || '',
      backdropClass: config.backdropClass || '',
      closeOnNavigation: config.closeOnNavigation || false
    });

    return this.dialogRef;
  }

  openDialogV2(template: IDialogData, config: MatDialogConfig): any {
    this.dialogRef = this.matDialog.open(DialogComponent, {
      height: config.height,
      width: config.width,
      maxHeight: config.maxHeight || 'auto',
      maxWidth: config.maxWidth || 'auto',
      data: template,
      panelClass: config.panelClass,
      closeOnNavigation: config.closeOnNavigation || false
    });
    this.dialogRef.afterClosed().subscribe((result: any) => console.log('closed'));
    return this.dialogRef;
  }
}