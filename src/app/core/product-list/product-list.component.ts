import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../shared/services/api/api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {

  all_product_data;
  addEditProductForm: FormGroup;
  addEditProduct: boolean = false;
  popup_header: string;
  add_product: boolean;
  edit_product: boolean;

  product_data;
  product_dto: any;

  single_product_data;
  edit_product_id;
  public product_url = environment.server_url + '/products/';

  constructor(private formBuilder: FormBuilder, private router: Router,private http: HttpClient) { }

  ngOnInit() {
    this.addEditProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      uploadPhoto: ['', Validators.required],
      productDesc: ['', Validators.required],
      mrp: ['', Validators.required],
      dp: ['', Validators.required],
      status: ['', Validators.required]
    })
    this.getAllProduct()
  }

  get rf() { return this.addEditProductForm.controls; }

  getAllProduct() {
    // this.product_service.allProduct().subscribe(data => {
    //   this.all_product_data = data;
    // }, error => {
    //   console.log("My error", error);
    // })
    this.get(this.product_url);
  }
  private formatErrors(error: any) {
    console.error(error); // Log the error to the console
    return throwError(error.error);
  }
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(path, { params }).pipe(catchError(this.formatErrors));
  }
  addProductPopup() {
    this.add_product = true;
    this.edit_product = false;
    this.popup_header = "Add New Product";
    this.addEditProductForm.reset();
  }

  addNewProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status
    }
    // this.product_service.addNewProduct(this.product_dto).subscribe(data => {
    //   // console.log(data);
    //   // jQuery('#addEditProductModal').modal('toggle');
    //   this.getAllProduct();
    // }, err => {
    //   alert("Some Error Occured");
    // })
  }

  editProductPopup(id) {
    this.add_product = false;
    this.edit_product = true;
    this.popup_header = "Edit Product";
    this.addEditProductForm.reset();
    // this.product_service.singleProduct(id).subscribe(data => {
    //   this.single_product_data = data;
    //   this.edit_product_id = data.id;
    //   // console.log("single_product_data", this.single_product_data)
    //   this.addEditProductForm.setValue({
    //     name: this.single_product_data.name,
    //     // uploadPhoto: '',
    //     uploadPhoto: this.single_product_data.uploadPhoto,
    //     productDesc: this.single_product_data.productDesc,
    //     mrp: this.single_product_data.mrp,
    //     dp: this.single_product_data.dp,
    //     status: this.single_product_data.status
    //   })
    // })
  }

  updateProduct() {
    this.addEditProduct = true;
    if (this.addEditProductForm.invalid) {
      // alert('Error!! :-)\n\n' + JSON.stringify(this.addEditUserForm.value))
      return;
    }
    this.product_data = this.addEditProductForm.value;
    this.product_dto = {
      id: 0,
      name: this.product_data.name,
      uploadPhoto: this.product_data.uploadPhoto,
      productDesc: this.product_data.productDesc,
      mrp: this.product_data.mrp,
      dp: this.product_data.dp,
      status: this.product_data.status
    }
    // this.product_service.updateProduct(this.edit_product_id, this.product_dto).subscribe(data => {
    //   // console.log(data);
    //   // jQuery('#addEditProductModal').modal('toggle');
    //   this.getAllProduct();
    // }, err => {
    //   alert("Some Error Occured");
    // })
  }

  deleteProduct(id) {
    let r = confirm("Do you want to delete the product ID: " + id + "?");
    if (r == true) {
      // this.product_service.deleteProduct(id).subscribe(data => {
      //   console.log("deleted successfully", data);
      //   this.getAllProduct();
      // }, err => {
      //   alert("Some Error Occured");
      // })
    } else {
      alert("You pressed Cancel!");
    }

  }

}
function jQuery(arg0: string) {
  throw new Error('Function not implemented.');
}

