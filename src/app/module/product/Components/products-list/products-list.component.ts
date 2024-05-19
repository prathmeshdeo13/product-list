import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {
  productsDetails : any[] = [] ;
  ProductForm! : FormGroup;
  skip: number = 0;
  limit: number = 10; 
  total: number = 0;
  currentPage :number = 1;
  totalPages:number = 0;
  product : boolean = true;
  id!: number;
  title!: string;
  productId! :number
  label : string = "Update";

  constructor(private productService : ProductService,
    private router : Router,
    private formbuilder: FormBuilder,
    private route : ActivatedRoute,){
    this.ProductForm = this.inItForm();
    }

  ngOnInit(){
    this.getAllProductData();
  }

  inItForm():FormGroup{
    return this.ProductForm = this.formbuilder.group({
      id:[],
      title:[''],
      price: [''],
     });
   }



  edit(id:number){
    this.productId = id
    this.productService.getByProductId(id).subscribe((response)=>{
      this.ProductForm.patchValue(response);
      this.update();
      this.product = false;
    })
  }

  back(){
   this.product = true;
  }

  update() {
    if (this.label == "Update") { 
      this.productService.updateProduct(this.productId, this.ProductForm.value).subscribe((response) => {
      this.router.navigate(['/product/product-list']);
      });
    }
  }

  delete(id:number){
    this.productService.deleteProduct(id).subscribe((response)=>{  
    alert("Product Deleted Successfully")
    this.getAllProductData();
    })
  }

  nextPage(): void {
    if (this.skip + this.limit < this.total) {
      this.skip  += this.limit;
      this.getAllProductData();
    }
  }
  
  previousPage(): void {
    if (this.skip - this.limit >= 0) {
      this.skip -= this.limit;
      this.getAllProductData();
    }
  }

  changePage(page: number) {
    if (page < 1 || page > this.total) {
      return;
    }
    this.currentPage = page;
    this.skip  = (this.currentPage - 1) * this.limit;
    this.getAllProductData();
  }

  getAllProductData(){
    this.productService.getProduct(this.skip, this.limit).subscribe((data :any) => {
      this.productsDetails = data.products;
      this.total = data.total;
      this.totalPages = this.total /this.limit ;
      console.log(this.productsDetails)
    });
  }

}
