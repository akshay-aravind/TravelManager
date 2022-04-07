import { Component, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { CustomerService } from '../service/customer.service';
import { Router } from '@angular/router';
import { PackageService } from 'src/app/package/service/package.service';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  @ViewChild('input3') input3: ElementRef;
  customerFName;
  customerLName;
  customerName;
  custPhoneNumber;
  email;
  selectedPKG;
  tripDays;
  tripStart = new Date().toISOString().slice(0, 10);
  tripEnd;
  custPrice;
  custAddress;
  boardingLoc;
  foodOpt;
  travelMode;
  packages;
  r1;
  tripStartMinDate = new Date().toISOString().slice(0, 10);
  // tripStartMaxDate = new Date(2023);
  packageIds = [];
  packageIdmap = {};
  warning = false;
  tripMax = 1;
  selectedPackageTravelOptions = [];
  countries = ['India', 'China', 'Japan', 'Indonesia'];
  india = ['Kerala', 'Karnataka', 'Tamilnadu'];
  kerala = ['Ernakulam', 'trivandrum', 'Calicut'];
  karnataka = ['Bagalkot', 'Ballari', 'Belagavi'];
  tamilnadu = ['Ariyalur', 'Chengalpattu', 'Chennai'];
  china = ['Beijing', 'Shanghai', 'Shanxi'];
  beijing = ['Dongcheng', 'Xicheng', 'Shijingshan'];
  shanghai = ['Huangpu', 'Xuhui', 'Changning'];
  shanxi = ['Xinghualing', 'Pingcheng', 'Cheng'];
  japan = ['Tohoku', 'Tottori', 'Saitama'];
  tohoku = ['Sendai', 'Iwaki', 'Koriyama'];
  tottori = ['Hino', 'Iwami', 'Yazu'];
  saitama = ['Chichibu', 'Iruma ', 'Hiki'];
  Indonesia = ['Bali', 'Papua', 'Lampung'];
  bali = ['Seminyak', 'Nusa Dua', 'nSanur'];
  papua = ['Daulo', 'Goroka', 'Henganofi'];
  lampung = ['South Lampung', 'Tulang Bawang', 'Way Kanan'];
  
  constructor(private custService: CustomerService,
    private custroute: Router,
    private pckService: PackageService) { }

  ngOnInit(): void {
    this.getPackages();
    // this.getRadioButton();
  }
  addCust() {
    const customer = {
      customerName: this.getCustomerName(),
      phoneNumber: this.custPhoneNumber,
      email: this.email,
      selectedPackage: this.selectedPKG,
      tripDays: this.tripDays,
      tripStartDate: this.tripStart,
      tripEndDate: this.tripEnd,
      price: this.custPrice,
      address: this.custAddress,
      boardingLocation: this.boardingLoc,
      foodOptions: this.foodOpt,
      travelMode: this.travelMode
    }
    this.custService.addNewCustomer(customer);
    this.custroute.navigate(['/customer']);
    console.log(customer);
  }
  getRadioButton() {

    console.log('Value:', this.input3.nativeElement.value);
  }
  getPackages() {
    this.pckService.fetchPackages().subscribe((pkgs) => {
      this.packages = pkgs;
      pkgs.forEach((pkg) => {
        this.packageIdmap[pkg.pkgId] = pkg.pkdName;
      })
      console.log('PackageIdmap', this.packageIdmap);
      console.log('package2', this.packageIdmap['PKG_2']);
      })
  }
  getCustomerName() {
    this.customerName = this.customerFName.concat('\t',this.customerLName);
    return this.customerName;
  }
  changePackage() {
    this.packages.forEach((pkg) => {
      if (pkg.pkgId === this.selectedPKG) {
        this.selectedPackageTravelOptions = pkg.travelOptions;
        console.log('Trip Days',pkg.tripDays);
        this.tripMax = pkg.tripDays;
        console.log('Selected Package', pkg);
        console.log('Travel Options', this.selectedPackageTravelOptions);
      }
    });

  }

}