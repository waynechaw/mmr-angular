import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, NgbModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

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
      "https://sjc1.vultrobjects.com/cucdn/gallery-38/art/lor-swole-scout.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-hungry-owlcat.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-dark-star-zed.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-pool-party-fiora.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-pool-party-taric.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-zoe-level-2.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-cosmic-yasuo-level-2.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-twisted-fate-level-2.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-sun-guardian.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-swain-level-2.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-swain-level-2.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-the-grand-plaza.jpg",
      "https://masteringruneterra.com/wp-content/uploads/cards/full/04IO004-full.webp",
      "https://i.redd.it/g5h82dx73ta71.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-shyvana-dragon.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-soraka-level-2.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-stony-supressor.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-starspring.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-azir.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-kindred.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-helper-spirit.jpg",
      "https://www.creativeuncut.com/gallery-38/art/lor-dragon-chow.jpg"






    ];
    var random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    document.body.style.backgroundImage = `url('${random}')`;

  }
}
