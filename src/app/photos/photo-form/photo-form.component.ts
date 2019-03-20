import { UserService } from './../../core/user/user.service';
import { HttpResponse } from '@angular/common/http';
import { CentralAlertService } from './../../shared/central-alert/central-alert.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PhotoService } from '../photo/photo.service';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  templateUrl: './photo-form.component.html'
})
export class PhotoFormComponent implements OnInit {

  photoForm: FormGroup;
  file: File;
  preview: string;
  uploadPercentageDone: number = 0;
  @ViewChild('chooseFile') chooseFile: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder,
              private photoService: PhotoService,
              private router: Router,
              private changeDetector: ChangeDetectorRef,
              private centralAlert: CentralAlertService,
              private userService: UserService) { }

  ngOnInit() {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
    this.changeDetector.detectChanges();
    this.chooseFile.nativeElement.click();
  }

  upload() {
    const description = this.photoForm.get('description') .value;
    const allowComments = this.photoForm.get('allowComments').value;

    this.photoService.upload( description,
                              allowComments,
                              this.file)
                        .subscribe((event : HttpEvent<any>) => {
                          if (event.type == HttpEventType.UploadProgress) {
                            this.uploadPercentageDone = Math.round(100 * event.loaded / event.total);
                          } else if (event instanceof HttpResponse) {
                            this.centralAlert.success("The photo was uploaded successfully");
                            this.router.navigate(['/user', this.userService.getUserName()]);
                          }
                        },
                        (err)  => {
                          console.log(err);
                          this.centralAlert.error("Something wrong happend while the photo was uploaded");
                        }
                      );
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
