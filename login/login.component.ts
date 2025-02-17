import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public title_system:string="Quản lý giỏ hàng";
  public user_name_default:string="K22411CA"
  public red_color_footer="red_color_footer"
  public bold_font_footer="bold_font_footer"
  public red_bold_format_footer={
    "red_color_footer":true,
    "bold_font_footer":true
  }
  send_user_pass(uid:string,pwd:string){
    alert("Bạn gửi username="+uid+";password="+pwd )
}
}
