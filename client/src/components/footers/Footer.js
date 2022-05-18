import React from "react";

const Footer = () => {
  return (
    <footer>
        <div class="splitter"></div>
        <ul>
            <ul>
              <li>
                  <div class="icon" data-icon="U"></div>
                  <div class="text">
                      <h4>About</h4>
                      <div>Nội dung được tham khảo từ Youtube. <a href="#">Read more</a></div>
                  </div>
              </li>
              <li>
                  <div class="icon" data-icon="g"></div>
                  <div class="text">
                      <h4>Cloud</h4>
                      <div>Trang web sử dụng nội dung từ Github <a href="#">Read more</a></div>
                  </div>
              </li>
              <li>
                  <div class="icon" data-icon="G"></div>
                  <div class="text">
                      <h4>Image</h4>
                      <div>Trang web có nội dung từ Google. <a href="#">Read more</a></div>
                  </div>
              </li>
          </ul>
        </ul>
 
        <div class="bar">
            <div class="bar-wrap">
                <ul class="links">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">License</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Advertise</a></li>
                    <li><a href="#">About</a></li>
                </ul>
 
                <div class="social">
                    <a href="#" class="fb">
                      <span data-icon="f" class="icon"></span>
                      <span class="info">
                          <span class="follow">Become a fan Facebook</span>
                          <span class="num">9,999</span>
                      </span>
                    </a>
          
                    <a href="#" class="tw">
                        <span data-icon="T" class="icon"></span>
                        <span class="info">
                            <span class="follow">Follow us Twitter</span>
                            <span class="num">9,999</span>
                        </span>
                    </a>
          
                    <a href="https://github.com/thinhvu8801/WEB" class="rss">
                        <span data-icon="g" class="icon"></span>
                        <span class="info">
                            <span class="follow">Subscribe Github</span>
                            <span class="num">9,999</span>
                        </span>
                    </a>
                </div>
                <div class="clear"></div>
                <div class="copyright">&copy;  2022 All Rights Reserved</div>
            </div>
        </div>
    </footer>
  )
}

export default Footer;