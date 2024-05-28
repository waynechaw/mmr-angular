import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgbModule, NgbCollapseModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  isCollapsed = true;

  ngOnInit() {

    var backgrounds = [
      "https://www.iamag.co/wp-content/uploads/2023/06/kudos-productions-thousand-pierced-volibear.jpg",
      "https://www.iamag.co/wp-content/uploads/2023/06/kudos-productions-airis.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-52.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-112.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-129.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-183.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-199.jpg",
      "https://i.imgur.com/uBE6rS8.png",
      "https://images5.alphacoders.com/131/1311515.jpeg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-131.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-132.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-204.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-205.jpg",
      "https://www.iamag.co/wp-content/uploads/2022/04/Legends-of-Runeterra-34.jpg",
      "https://www.iamag.co/wp-content/uploads/2022/04/Legends-of-Runeterra-7.jpg",
      "https://www.iamag.co/wp-content/uploads/2023/11/envar-studio-05io004ho-ahriholiday.jpg",
      "https://www.iamag.co/wp-content/uploads/2023/11/envar-studio-morgana.jpg",
      "https://www.iamag.co/wp-content/uploads/2023/11/envar-studio-ahrispiritblossom.jpg",
      "https://www.iamag.co/wp-content/uploads/2022/04/Legends-of-Runeterra-1.jpg",
      "https://www.iamag.co/wp-content/uploads/2022/04/Legends-of-Runeterra-38.jpg",
      "https://www.iamag.co/wp-content/uploads/2022/04/Legends-of-Runeterra-33.jpg",
      "https://www.iamag.co/wp-content/uploads/2022/04/Legends-of-Runeterra-18.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-222.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-219.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-181.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-165.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-154.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-130.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-128.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-117.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-111.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-101.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-99.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-93.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-90.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-14.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-4.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-280.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-266.jpg",
      "https://www.iamag.co/wp-content/uploads/2019/11/legends-runeterra-sixmorevodka-019.jpg",
      "https://www.iamag.co/wp-content/uploads/2020/09/The-Art-of-Legends-of-Runeterra-169.jpg"








    ];
    var random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url('${random}')`;

  }
}
