import React, {  useState } from "react";
import "./contractus.css";
import Chatbot from "../components/chatbot";
import NavbarPage from "../components/navnew";

const Contractus = () => {
  const [showDropdown, SetshowDropdown] = useState(true);
  const [isActiveTop, SetisActiveTop] = useState(true);
  const [isActiveButtom, SetisActiveButtom] = useState(false);
  const Hiddendropdown = () => {
    SetshowDropdown(false);}
  const ActiveTop = () => {
    SetisActiveTop(true);
    SetisActiveButtom(false);
  };
  const ActiveButtom = () => {
    SetisActiveButtom(true);
    SetisActiveTop(false);
  };
  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      
      <h1 className="h1-contractus">ติดต่อเรา</h1>
      <div className="container1-contract">
        <div className="row">
          {isActiveTop ? 
          <div className="contracthover-contract" onClick={()=>ActiveTop()}>ช่องทางการติดต่อ</div>
            :
            <div className="contract-contract" onClick={()=>ActiveTop()}>ช่องทางการติดต่อ</div>
        }
        {isActiveButtom ?
           <div className="developerhover-contract" onClick={()=>ActiveButtom()}>ทีมผู้จัดทำ</div>
          :
          <div className="developer-contract" onClick={()=>ActiveButtom()}>ทีมผู้จัดทำ</div>
        }
    
          <div className="line-contract"></div>
        </div>
        


      </div>{
        isActiveTop ?
        <div className="container2-contract">
                <div className="row">
                  <div className="column2-contract-l">
                    <div className="map-contract">
                      <iframe className="style-map-contract" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.1083911253977!2d100.494455214653!3d13.651169990412644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2a251bb6b0cf1%3A0xf656e94ff13324ad!2sKing%20Mongkut&#39;s%20University%20of%20Technology%20Thonburi!5e0!3m2!1sth!2sth!4v1613653445252!5m2!1sth!2sth"></iframe>
                    </div>
                  </div>
                  <div className="column2-contract-r address">
                    <div className="address-contract">
                      มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี <br/>
                      126  ถนนประชาอุทิศ แขวงบางมด <br className="brnone-contract"/>
                      เขตทุ่งครุ กรุงเทพฯ 10140 <br className="brnone-contract"/>
                      <div className="emty-contract"></div>
                      โทรศัพท์ : 02-470-8000 <br className="brnone-contract"/>
                      <div className="emty2-contract"></div>
                      Email : Monkey_Fraud@gmail.com
                    </div>
                    <div className="line2-contract"></div>
                    <a href="https://www.facebook.com/MonkeyFruad-105444291586616">
                      <div className="pagefb-contract">
                        ติดต่อเพจน้องพะโล้ <br />
                        เพื่ออัพเดทข่าวสารและพูดคุยกันได้ที่นี่
                        <div className="post-img1">
                          <img className="imgfb-contract" src="/img/facebook.jpg" />
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              : null
      }

      


      {
        isActiveButtom ?
        <div className="container3-contract">
        <div className="row">
          <div className="column3-contract">
            <img src="/img/punch.jpg" className="image-contract" />
            <div className="name-contract">
              กรกช ศิริกันทรมาศ<br/>
              <span className="role-contract">Business Analyst</span>
            </div>
          </div>
          <div className="column3-contract">
            <img src="/img/huak.jpg" className="image-contract" />
            <div className="name-contract">
              คมศักดิ์ กรณย์ประกิตติ์<br/>
              <span className="role-contract">Project Manager</span>
            </div>
          </div>
          <div className="column3-contract">
            <img src="/img/nuity.jpg" className="image-contract" />
            <div className="name-contract">
              บวรศักดิ์ เหลือจันทร์<br/>
              <span className="role-contract">Tester</span>
            </div>
          </div>
        </div>

        <div className="row">
            <div className="column4-contract-1">
              <img src="/img/emty.png" className="imageemty-contract" />
            </div>
            <div className="column4-contract chack-contract">
              <img src="/img/chake.jpg" className="image-contract" />
              <div className="name-contract">
                วสิษฐ์พล แก้วพลูศรี <br/>
                <span className="role-contract">Software Developer</span>
              </div>
            </div>
            <div className="column4-contract praew-contract">
              <img src="/img/praew.jpg" className="image-contract" />
              <div className="name-contract">
                สิริวิมล กังสวณิช<br/>
                <span className="role-contract">UI/UX Designer</span>
              </div>
            </div>
            <div className="column4-contract-1">
              <img src="/img/emty.png" className="imageemty-contract" />
            </div>
          </div>
        </div>
        : null
      }
        

      <Chatbot />
    </div>
  );
};

export default Contractus;
