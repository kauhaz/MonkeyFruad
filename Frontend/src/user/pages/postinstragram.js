import React, { useEffect, useState, useContext } from "react";
import NavbarPage from "../components/navnew";
import Axios from "axios";
import "./post.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import Chatbot from "../components/chatbot";
import Commentitem from "../components/commentitem";
import ClipLoader from "../components/clipLoader";
import * as moment from "moment";
import "moment/locale/th";
import { Form, Col } from "react-bootstrap";
import usercontext from "../context/usercontext";

const PostInstragram = () => {
  const [show, Setshow] = useState();
  const [Show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const location = useLocation();
  let { user, setUser } = useContext(usercontext);

  const [facebook, Setfacebook] = useState();
  const [line, Setline] = useState();
  const [instagram, Setinstagram] = useState();
  const [twitter, Settwitter] = useState();
  const [other, Setother] = useState();
  const [result, Setresult] = useState();
  const [assesory, Setassesory] = useState(false);
  const [cloth, Setcloth] = useState(false);
  const [shoe, Setshoe] = useState(false);
  const [bag, Setbag] = useState(false);
  const [phone, Setphone] = useState(false);
  const [food, Setfood] = useState(false);
  const [foodwealth, Setfoodwealth] = useState(false);
  const [beauty, Setbeauty] = useState(false);
  const [computer, Setcomputer] = useState(false);
  const [camera, Setcamera] = useState(false);
  const [sport, Setsport] = useState(false);
  const [media, Setmedia] = useState(false);
  const [game, Setgame] = useState(false);
  const [car, Setcar] = useState(false);
  const [ticket, Setticket] = useState(false);
  const [electronic, Setelectronic] = useState(false);
  const [furniture, Setfurniture] = useState(false);
  const [pet, Setpet] = useState(false);
  const [kian, Setkian] = useState(false);
  const [book, Setbook] = useState(false);
  const [music, Setmusic] = useState(false);

  const [othercatalog, Setothercatalog] = useState(false);

  const [checkfacebook, Setcheckfacebook] = useState(false);
  const [checkline, Setcheckline] = useState(false);
  const [checkinstagram, Setcheckinstagram] = useState(true);
  const [checktwitter, Setchecktwitter] = useState(false);
  const [checkother, Setcheckother] = useState(false);

  const [checkassesory, Setcheckassesory] = useState(false);
  const [checkcloth, Setcheckcloth] = useState(false);
  const [checkshoe, Setcheckshoe] = useState(false);
  const [checkbag, Setcheckbag] = useState(false);
  const [checkphone, Setcheckphone] = useState(false);
  const [checkfood, Setcheckfood] = useState(false);
  const [checkfoodwealth, Setcheckfoodwealth] = useState(false);
  const [checkbeauty, Setcheckbeauty] = useState(false);
  const [checkcomputer, Setcheckcomputer] = useState(false);
  const [checkcamera, Setcheckcamera] = useState(false);
  const [checksport, Setchecksport] = useState(false);
  const [checkmedia, Setcheckmedia] = useState(false);
  const [checkgame, Setcheckgame] = useState(false);
  const [checkcar, Setcheckcar] = useState(false);
  const [checkticket, Setcheckticket] = useState(false);
  const [checkelectronic, Setcheckelectronic] = useState(false);
  const [checkfurniture, Setcheckfurniture] = useState(false);
  const [checkpet, Setcheckpet] = useState(false);
  const [checkkian, Setcheckkian] = useState(false);
  const [checkbook, Setcheckbook] = useState(false);
  const [checkmusic, Setcheckmusic] = useState(false);
  const [checkothercatalog, Setcheckothercatalog] = useState(false);
  const [searchstart, Setsearchstart] = useState();
  const [searchend, Setsearchend] = useState();

  const [sortvalue, Setsortvalue] = useState("ใหม่ล่าสุด");
  const [error, Seterror] = useState();
  const [loading, Setloading] = useState();
  const [click, Setclick] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);
  let history = useHistory();
  const [showDropdown, SetshowDropdown] = useState(true);

  //  const handleclick = async() => {
  //     Setcheck(!check)
  //   }
  const Hiddendropdown = () => {
    SetshowDropdown(false);
  };
  const ok = async () => {
    Setloading(true);
    if(sortvalue === "ใหม่ล่าสุด"){
      const getpost = await Axios.get(`http://localhost:7000/post/post`);
      Setshow(getpost.data.item);
      var getdata = getpost.data.item;
     }
     else if(sortvalue === "จำนวนเงินมากที่สุด"){
        const getpost = await Axios.get(`http://localhost:7000/post/post/sortmoney`)
        Setshow(getpost.data.item);
        var getdata = getpost.data.item;
      }
    Setloading(false);
   
    var item = [];
    // Setloading(true)
    getdata.filter((doc) => {
      if (checkfacebook) {
        Setshow();
        if (doc.social === "Facebook") {
          if (checkcloth) {
            Setshow();
            if (doc.productcategory === "เสื้อผ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkassesory) {
            Setshow();

            if (doc.productcategory === "เครื่องประดับ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkshoe) {
            Setshow();
            if (doc.productcategory === "รองเท้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbag) {
            Setshow();
            if (doc.productcategory === "กระเป๋า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkphone) {
            Setshow();
            if (doc.productcategory === "มือถือและอุปกรณ์เสริม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfood) {
            Setshow();
            if (doc.productcategory === "อาหารและเครื่องดื่ม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfoodwealth) {
            Setshow();
            if (doc.productcategory === "อาหารเสริมและผลิตภัณฑ์สุขภาพ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkbeauty) {
            Setshow();
            if (
              doc.productcategory === "เครื่องสำอางค์และอุปกรณ์เสริมความงาม"
            ) {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcomputer) {
            Setshow();
            if (doc.productcategory === "คอมพิวเตอร์แล็ปท็อป") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcamera) {
            Setshow();
            if (doc.productcategory === "กล้องและอุปกรณ์ถ่ายภาพ") {
              if (searchstart && searchend) {
                Setshow();

                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checksport) {
            Setshow();
            if (doc.productcategory === "กีฬาและกิจกรรมกลางแจ้ง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmedia) {
            Setshow();
            if (doc.productcategory === "สื่อบันเทิงภายในบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkgame) {
            Setshow();
            if (doc.productcategory === "เกมส์และฮ๊อบบี้") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkcar) {
            Setshow();
            if (doc.productcategory === "ยานยนต์") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkticket) {
            Setshow();
            if (doc.productcategory === "ตั๋วและบัตรกำนัน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เครื่องใช้ไฟฟ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เฟอร์นิเจอร์และของตกแต่งบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkpet) {
            Setshow();
            if (doc.productcategory === "สัตว์เลี้ยง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkkian) {
            Setshow();
            if (doc.productcategory === "เครื่องเขียน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbook) {
            Setshow();
            if (doc.productcategory === "หนังสือ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmusic) {
            Setshow();
            if (doc.productcategory === "เครื่องดนตรี") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkothercatalog) {
            Setshow();
            if (doc.productcategory === "อื่นๆ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (
            !checkcloth &&
            !checkassesory &&
            !checkshoe &&
            !checkbag &&
            !checkphone &&
            !checkfood &&
            !checkfoodwealth &&
            !checkbeauty &&
            !checkcomputer &&
            !checkcamera &&
            !checksport &&
            !checkmedia &&
            !checkgame &&
            !checkcar &&
            !checkticket &&
            !checkelectronic &&
            !checkfurniture &&
            !checkpet &&
            !checkkian &&
            !checkbook &&
            !checkmusic &&
            !checkothercatalog
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }
      if (checkline) {
        Setshow();
        if (doc.social === "Line") {
          if (checkcloth) {
            Setshow();
            if (doc.productcategory === "เสื้อผ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkassesory) {
            Setshow();

            if (doc.productcategory === "เครื่องประดับ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkshoe) {
            Setshow();
            if (doc.productcategory === "รองเท้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbag) {
            Setshow();
            if (doc.productcategory === "กระเป๋า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkphone) {
            Setshow();
            if (doc.productcategory === "มือถือและอุปกรณ์เสริม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfood) {
            Setshow();
            if (doc.productcategory === "อาหารและเครื่องดื่ม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfoodwealth) {
            Setshow();
            if (doc.productcategory === "อาหารเสริมและผลิตภัณฑ์สุขภาพ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkbeauty) {
            Setshow();
            if (
              doc.productcategory === "เครื่องสำอางค์และอุปกรณ์เสริมความงาม"
            ) {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcomputer) {
            Setshow();
            if (doc.productcategory === "คอมพิวเตอร์แล็ปท็อป") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcamera) {
            Setshow();
            if (doc.productcategory === "กล้องและอุปกรณ์ถ่ายภาพ") {
              if (searchstart && searchend) {
                Setshow();

                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checksport) {
            Setshow();
            if (doc.productcategory === "กีฬาและกิจกรรมกลางแจ้ง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmedia) {
            Setshow();
            if (doc.productcategory === "สื่อบันเทิงภายในบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkgame) {
            Setshow();
            if (doc.productcategory === "เกมส์และฮ๊อบบี้") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkcar) {
            Setshow();
            if (doc.productcategory === "ยานยนต์") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkticket) {
            Setshow();
            if (doc.productcategory === "ตั๋วและบัตรกำนัน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เครื่องใช้ไฟฟ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เฟอร์นิเจอร์และของตกแต่งบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkpet) {
            Setshow();
            if (doc.productcategory === "สัตว์เลี้ยง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkkian) {
            Setshow();
            if (doc.productcategory === "เครื่องเขียน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbook) {
            Setshow();
            if (doc.productcategory === "หนังสือ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmusic) {
            Setshow();
            if (doc.productcategory === "เครื่องดนตรี") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkothercatalog) {
            Setshow();
            if (doc.productcategory === "อื่นๆ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (
            !checkcloth &&
            !checkassesory &&
            !checkshoe &&
            !checkbag &&
            !checkphone &&
            !checkfood &&
            !checkfoodwealth &&
            !checkbeauty &&
            !checkcomputer &&
            !checkcamera &&
            !checksport &&
            !checkmedia &&
            !checkgame &&
            !checkcar &&
            !checkticket &&
            !checkelectronic &&
            !checkfurniture &&
            !checkpet &&
            !checkkian &&
            !checkbook &&
            !checkmusic &&
            !checkothercatalog
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }
      //line

      if (checkinstagram) {
        Setshow();
        if (doc.social === "Instagram") {
          if (checkcloth) {
            Setshow();
            if (doc.productcategory === "เสื้อผ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkassesory) {
            Setshow();

            if (doc.productcategory === "เครื่องประดับ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkshoe) {
            Setshow();
            if (doc.productcategory === "รองเท้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbag) {
            Setshow();
            if (doc.productcategory === "กระเป๋า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkphone) {
            Setshow();
            if (doc.productcategory === "มือถือและอุปกรณ์เสริม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfood) {
            Setshow();
            if (doc.productcategory === "อาหารและเครื่องดื่ม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfoodwealth) {
            Setshow();
            if (doc.productcategory === "อาหารเสริมและผลิตภัณฑ์สุขภาพ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkbeauty) {
            Setshow();
            if (
              doc.productcategory === "เครื่องสำอางค์และอุปกรณ์เสริมความงาม"
            ) {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcomputer) {
            Setshow();
            if (doc.productcategory === "คอมพิวเตอร์แล็ปท็อป") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcamera) {
            Setshow();
            if (doc.productcategory === "กล้องและอุปกรณ์ถ่ายภาพ") {
              if (searchstart && searchend) {
                Setshow();

                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checksport) {
            Setshow();
            if (doc.productcategory === "กีฬาและกิจกรรมกลางแจ้ง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmedia) {
            Setshow();
            if (doc.productcategory === "สื่อบันเทิงภายในบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkgame) {
            Setshow();
            if (doc.productcategory === "เกมส์และฮ๊อบบี้") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkcar) {
            Setshow();
            if (doc.productcategory === "ยานยนต์") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkticket) {
            Setshow();
            if (doc.productcategory === "ตั๋วและบัตรกำนัน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เครื่องใช้ไฟฟ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เฟอร์นิเจอร์และของตกแต่งบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkpet) {
            Setshow();
            if (doc.productcategory === "สัตว์เลี้ยง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkkian) {
            Setshow();
            if (doc.productcategory === "เครื่องเขียน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbook) {
            Setshow();
            if (doc.productcategory === "หนังสือ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmusic) {
            Setshow();
            if (doc.productcategory === "เครื่องดนตรี") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkothercatalog) {
            Setshow();
            if (doc.productcategory === "อื่นๆ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (
            !checkcloth &&
            !checkassesory &&
            !checkshoe &&
            !checkbag &&
            !checkphone &&
            !checkfood &&
            !checkfoodwealth &&
            !checkbeauty &&
            !checkcomputer &&
            !checkcamera &&
            !checksport &&
            !checkmedia &&
            !checkgame &&
            !checkcar &&
            !checkticket &&
            !checkelectronic &&
            !checkfurniture &&
            !checkpet &&
            !checkkian &&
            !checkbook &&
            !checkmusic &&
            !checkothercatalog
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      //insta

      if (checktwitter) {
        Setshow();
        if (doc.social === "Twitter") {
          if (checkcloth) {
            Setshow();
            if (doc.productcategory === "เสื้อผ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkassesory) {
            Setshow();

            if (doc.productcategory === "เครื่องประดับ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkshoe) {
            Setshow();
            if (doc.productcategory === "รองเท้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbag) {
            Setshow();
            if (doc.productcategory === "กระเป๋า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkphone) {
            Setshow();
            if (doc.productcategory === "มือถือและอุปกรณ์เสริม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfood) {
            Setshow();
            if (doc.productcategory === "อาหารและเครื่องดื่ม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfoodwealth) {
            Setshow();
            if (doc.productcategory === "อาหารเสริมและผลิตภัณฑ์สุขภาพ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkbeauty) {
            Setshow();
            if (
              doc.productcategory === "เครื่องสำอางค์และอุปกรณ์เสริมความงาม"
            ) {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcomputer) {
            Setshow();
            if (doc.productcategory === "คอมพิวเตอร์แล็ปท็อป") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcamera) {
            Setshow();
            if (doc.productcategory === "กล้องและอุปกรณ์ถ่ายภาพ") {
              if (searchstart && searchend) {
                Setshow();

                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checksport) {
            Setshow();
            if (doc.productcategory === "กีฬาและกิจกรรมกลางแจ้ง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmedia) {
            Setshow();
            if (doc.productcategory === "สื่อบันเทิงภายในบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkgame) {
            Setshow();
            if (doc.productcategory === "เกมส์และฮ๊อบบี้") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkcar) {
            Setshow();
            if (doc.productcategory === "ยานยนต์") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkticket) {
            Setshow();
            if (doc.productcategory === "ตั๋วและบัตรกำนัน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เครื่องใช้ไฟฟ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เฟอร์นิเจอร์และของตกแต่งบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkpet) {
            Setshow();
            if (doc.productcategory === "สัตว์เลี้ยง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkkian) {
            Setshow();
            if (doc.productcategory === "เครื่องเขียน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbook) {
            Setshow();
            if (doc.productcategory === "หนังสือ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmusic) {
            Setshow();
            if (doc.productcategory === "เครื่องดนตรี") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkothercatalog) {
            Setshow();
            if (doc.productcategory === "อื่นๆ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (
            !checkcloth &&
            !checkassesory &&
            !checkshoe &&
            !checkbag &&
            !checkphone &&
            !checkfood &&
            !checkfoodwealth &&
            !checkbeauty &&
            !checkcomputer &&
            !checkcamera &&
            !checksport &&
            !checkmedia &&
            !checkgame &&
            !checkcar &&
            !checkticket &&
            !checkelectronic &&
            !checkfurniture &&
            !checkpet &&
            !checkkian &&
            !checkbook &&
            !checkmusic &&
            !checkothercatalog
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      //twitter

      if (checkother) {
        Setshow();
        if (doc.social === "อื่นๆ") {
          if (checkcloth) {
            Setshow();
            if (doc.productcategory === "เสื้อผ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkassesory) {
            Setshow();

            if (doc.productcategory === "เครื่องประดับ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkshoe) {
            Setshow();
            if (doc.productcategory === "รองเท้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbag) {
            Setshow();
            if (doc.productcategory === "กระเป๋า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkphone) {
            Setshow();
            if (doc.productcategory === "มือถือและอุปกรณ์เสริม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfood) {
            Setshow();
            if (doc.productcategory === "อาหารและเครื่องดื่ม") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkfoodwealth) {
            Setshow();
            if (doc.productcategory === "อาหารเสริมและผลิตภัณฑ์สุขภาพ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkbeauty) {
            Setshow();
            if (
              doc.productcategory === "เครื่องสำอางค์และอุปกรณ์เสริมความงาม"
            ) {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcomputer) {
            Setshow();
            if (doc.productcategory === "คอมพิวเตอร์แล็ปท็อป") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }
          if (checkcamera) {
            Setshow();
            if (doc.productcategory === "กล้องและอุปกรณ์ถ่ายภาพ") {
              if (searchstart && searchend) {
                Setshow();

                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checksport) {
            Setshow();
            if (doc.productcategory === "กีฬาและกิจกรรมกลางแจ้ง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmedia) {
            Setshow();
            if (doc.productcategory === "สื่อบันเทิงภายในบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkgame) {
            Setshow();
            if (doc.productcategory === "เกมส์และฮ๊อบบี้") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkcar) {
            Setshow();
            if (doc.productcategory === "ยานยนต์") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkticket) {
            Setshow();
            if (doc.productcategory === "ตั๋วและบัตรกำนัน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เครื่องใช้ไฟฟ้า") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkelectronic) {
            Setshow();
            if (doc.productcategory === "เฟอร์นิเจอร์และของตกแต่งบ้าน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkpet) {
            Setshow();
            if (doc.productcategory === "สัตว์เลี้ยง") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkkian) {
            Setshow();
            if (doc.productcategory === "เครื่องเขียน") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkbook) {
            Setshow();
            if (doc.productcategory === "หนังสือ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkmusic) {
            Setshow();
            if (doc.productcategory === "เครื่องดนตรี") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (checkothercatalog) {
            Setshow();
            if (doc.productcategory === "อื่นๆ") {
              if (searchstart && searchend) {
                Setshow();
                if (doc.money >= searchstart) {
                  if (doc.money <= searchend) {
                    item.push(doc);
                    Setshow();
                  }
                }
              } else if (searchstart) {
                Setshow();
                if (doc.money >= searchstart) {
                  console.log(doc);
                  item.push(doc);
                  Setshow();
                }
              } else if (searchend) {
                Setshow();
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }

              if (!searchstart && !searchstart) {
                item.push(doc);
                Setshow();
              }
            }
          }

          if (
            !checkcloth &&
            !checkassesory &&
            !checkshoe &&
            !checkbag &&
            !checkphone &&
            !checkfood &&
            !checkfoodwealth &&
            !checkbeauty &&
            !checkcomputer &&
            !checkcamera &&
            !checksport &&
            !checkmedia &&
            !checkgame &&
            !checkcar &&
            !checkticket &&
            !checkelectronic &&
            !checkfurniture &&
            !checkpet &&
            !checkkian &&
            !checkbook &&
            !checkmusic &&
            !checkothercatalog
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }
      //other

      if (checkcloth) {
        Setshow();
        if (doc.productcategory === "เสื้อผ้า") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }
      if (checkassesory) {
        Setshow();
        if (doc.productcategory === "เครื่องประดับ") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkshoe) {
        Setshow();
        if (doc.productcategory === "รองเท้า") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkbag) {
        Setshow();
        if (doc.productcategory === "กระเป๋า") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkphone) {
        Setshow();
        if (doc.productcategory === "มือถือและอุปกรณ์เสริม") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkfood) {
        Setshow();
        if (doc.productcategory === "อาหารและเครื่องดื่ม") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkfoodwealth) {
        Setshow();
        if (doc.productcategory === "อาหารเสริมและผลิตภัณฑ์สุขภาพ") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkbeauty) {
        Setshow();
        if (doc.productcategory === "เครื่องสำอางค์และอุปกรณ์เสริมความงาม") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkcomputer) {
        Setshow();
        if (doc.productcategory === "คอมพิวเตอร์แล็ปท็อป") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkcamera) {
        Setshow();
        if (doc.productcategory === "กล้องและอุปกรณ์ถ่ายภาพ") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checksport) {
        Setshow();
        if (doc.productcategory === "กีฬาและกิจกรรมกลางแจ้ง") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkmedia) {
        Setshow();
        if (doc.productcategory === "สื่อบันเทิงภายในบ้าน") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkgame) {
        Setshow();
        if (doc.productcategory === "เกมส์และฮ๊อบบี้") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkcar) {
        Setshow();
        if (doc.productcategory === "ยานยนต์") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkticket) {
        Setshow();
        if (doc.productcategory === "ตั๋วและบัตรกำนัน") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkelectronic) {
        Setshow();
        if (doc.productcategory === "เครื่องใช้ไฟฟ้า") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkfurniture) {
        Setshow();
        if (doc.productcategory === "เฟอร์นิเจอร์และของตกแต่งบ้าน") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkpet) {
        Setshow();
        if (doc.productcategory === "สัตว์เลี้ยง") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkkian) {
        Setshow();
        if (doc.productcategory === "เครื่องเขียน") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }
      if (checkbook) {
        Setshow();
        if (doc.productcategory === "หนังสือ") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }
      if (checkmusic) {
        Setshow();
        if (doc.productcategory === "เครื่องดนตรี") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (checkothercatalog) {
        Setshow();
        if (doc.productcategory === "อื่นๆ") {
          if (
            !checkfacebook &&
            !checkline &&
            !checkinstagram &&
            !checktwitter &&
            !checkother
          ) {
            if (searchstart && searchend) {
              Setshow();
              if (doc.money >= searchstart) {
                if (doc.money <= searchend) {
                  item.push(doc);
                  Setshow();
                }
              }
            } else if (searchstart) {
              Setshow();
              if (doc.money >= searchstart) {
                console.log(doc);
                item.push(doc);
                Setshow();
              }
            } else if (searchend) {
              Setshow();
              if (doc.money <= searchend) {
                item.push(doc);
                Setshow();
              }
            }

            if (!searchstart && !searchstart) {
              item.push(doc);
              Setshow();
            }
          }
        }
      }

      if (
        !checkfacebook &&
        !checkline &&
        !checkinstagram &&
        !checktwitter &&
        !checkother &&
        !checkcloth &&
        !checkassesory &&
        !checkshoe &&
        !checkbag &&
        !checkphone &&
        !checkfood &&
        !checkfoodwealth &&
        !checkbeauty &&
        !checkcomputer &&
        !checkcamera &&
        !checksport &&
        !checkmedia &&
        !checkgame &&
        !checkcar &&
        !checkticket &&
        !checkelectronic &&
        !checkfurniture &&
        !checkpet &&
        !checkkian &&
        !checkbook &&
        !checkmusic &&
        !checkothercatalog
      ) {
        if (searchstart && searchend) {
          Setshow();
          if (doc.money >= searchstart) {
            if (doc.money <= searchend) {
              item.push(doc);
              Setshow();
            }
          }
        } else if (searchstart) {
          Setshow();
          if (doc.money >= searchstart) {
            item.push(doc);
            Setshow();
          }
        } else if (searchend) {
          Setshow();
          if (doc.money <= searchend) {
            item.push(doc);
            Setshow();
          }
        }

        if (!searchstart && !searchstart) {
          item.push(doc);
          Setshow();
        }
      }

      // if (cloth && doc.productcategory === "เสื้อผ้า") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkcloth) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social

      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "เสื้อผ้า" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      //   // if (assesory && doc.productcategory === "เครื่่องประดับ") {
      //   //   let o = []
      //   //   let i = 0
      //   //   let a = -1
      //   //   o.push(doc) // count doc
      //   //   for(let k=0; k <= o.length ; k ++ ){
      //   //     i ++
      //   //   } // count doc
      //   //   if (checkassesory) { //check select assesory
      //   //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //   //       console.log(item.length)
      //   //       item.forEach(doc2 =>{
      //   //         a ++
      //   //         if(doc2.productcategory !== "เครื่่องประดับ" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //   //           if(a > i){

      //   //           }else{
      //   //             item.push(doc)
      //   //             Setshow();
      //   //           }
      //   //         }

      //   //     })
      //   //     console.log(item)
      //   //     }else{
      //   //       item.push(doc);
      //   //           Setshow();
      //   //     }

      //   //   }
      //   // }

      // if (shoe && doc.productcategory === "รองเท้า") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkshoe) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "รองเท้า" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (bag && doc.productcategory === "กระเป๋า") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkbag) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "กระเป๋า" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (phone && doc.productcategory === "มือถือและอุปกรณ์เสริม") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkphone) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "มือถือและอุปกรณ์เสริม" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (food && doc.productcategory === "อาหารและเครื่องดื่ม") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkfood) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "อาหารและเครื่องดื่ม" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (foodwealth && doc.productcategory === "อาหารเสริมและผลิตภัณฑ์สุขภาพ") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkfoodwealth) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "อาหารเสริมและผลิตภัณฑ์สุขภาพ" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (beauty && doc.productcategory === "เครื่องสำอางค์และอุปกรณ์เสริมความงาม") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkbeauty) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "เครื่องสำอางค์และอุปกรณ์เสริมความงาม" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (computer && doc.productcategory === "คอมพิวเตอร์แล็ปท็อป") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkcomputer) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "คอมพิวเตอร์แล็ปท็อป" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (camera && doc.productcategory === "กล้องและอุปกรณ์ถ่ายภาพ") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkcamera) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "กล้องและอุปกรณ์ถ่ายภาพ" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (sport && doc.productcategory === "กีฬาและกิจกรรมกลางแจ้ง") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checksport) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "กีฬาและกิจกรรมกลางแจ้ง" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (media && doc.productcategory === "สื่อบันเทิงภายในบ้าน") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkmedia) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "สื่อบันเทิงภายในบ้าน" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (game && doc.productcategory === "เกมส์และฮ๊อบบี้") {

      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkgame) { //check select assesory
      //     console.log(doc)
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "เกมส์และฮ๊อบบี้" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (car && doc.productcategory === "ยานยนต์") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkcar) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "ยานยนต์" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (ticket && doc.productcategory === "ตั๋วและบัตรกำนัน") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkticket) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "ตั๋วและบัตรกำนัน" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (electronic && doc.productcategory === "เครื่องใช้ไฟฟ้า") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkelectronic) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "เครื่องใช้ไฟฟ้า" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (furniture && doc.productcategory === "เฟอร์นิเจอร์และของตกแต่งบ้าน") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkfurniture) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "เฟอร์นิเจอร์และของตกแต่งบ้าน" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (pet && doc.productcategory === "สัตว์เลี้ยง") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkpet) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "สัตว์เลี้ยง" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (kian && doc.productcategory === "เครื่องเขียน") {
      //   console.log("gggg")
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkkian) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "เครื่องเขียน" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (book && doc.productcategory === "หนังสือ") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkbook) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "หนังสือ" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      //   if (music && doc.productcategory === "เครื่องดนตรี") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkmusic) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "เครื่องดนตรี" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }

      // if (othercatalog && doc.productcategory === "อื่นๆ") {
      //   let o = []
      //   let i = 0
      //   let a = -1
      //   o.push(doc) // count doc
      //   for(let k=0; k <= o.length ; k ++ ){
      //     i ++
      //   } // count doc
      //   if (checkothercatalog) { //check select assesory
      //     if(checkfacebook || checkline || checkinstagram || checktwitter || checkother){ //check select social
      //       console.log(item.length)
      //       item.forEach(doc2 =>{
      //         a ++
      //         if(doc2.productcategory !== "อื่นๆ" && doc2.social !== doc.social && doc2.accountnumber !== doc.accountnumber && doc2.date !== doc.date){ //check not same post
      //           if(a > i){

      //           }else{
      //             item.push(doc)
      //             Setshow();
      //           }
      //         }

      //     })
      //     console.log(item)
      //     }else{
      //       item.push(doc);
      //           Setshow();
      //     }

      //   }
      // }
    });
    // Setloading(false)
    Setresult(item);
  };
  useEffect(() => {
    ok();
  }, [
    checkfacebook,
    checkinstagram,
    checkline,
    checktwitter,
    checkother,
    checkcloth,
    checkassesory,
    checkshoe,
    checkbag,
    checkphone,
    checkfood,
    checkfoodwealth,
    checkbeauty,
    checkcomputer,
    checkcamera,
    checksport,
    checkmedia,
    checkgame,
    checkcar,
    checkticket,
    checkelectronic,
    checkfurniture,
    checkpet,
    checkkian,
    checkbook,
    checkmusic,
    checkothercatalog,
    searchstart,
    searchend,
  ]);

  // console.log(result);

  return (
    <div onClick={() => Hiddendropdown()}>
      <NavbarPage
        SetshowDropdown={SetshowDropdown}
        showDropdown={showDropdown}
      />
      <div className="container-bigpost1">
        <div className="row postbigrow">
          <div className="column-post-left1">
            <Link to={`/linkruleshow/`}>
              <div className="container-post1">
                <div className="row postrow">
                  <div className="column1-postrow1">
                    <div className="post-img">
                      <img className="monkey" src="/img/logo v3.png" />
                    </div>
                  </div>
                  <div className="column2-postrow2">
                    <div className="post-linkpost1">
                      แจ้งข้อมูลคนโกงได้ที่นี่เลย
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            {loading ? (
              <ClipLoader />
            ) : (
              <div>
                {show ? (
                  show.map((res) => {
                    return (
                      <div>
                        <div className="container-post2">
                          <div className="cotainer-post3">
                            <div className="post-profile-img">
                              {res.photoURL ? (
                                <img
                                  className="img-circle"
                                  src={`${res.photoURL.url}`}
                                />
                              ) : (
                                <img
                                  className="img-circle"
                                  src={"/img/profile.png"}
                                />
                              )}
                              <div className="post-name">
                                {res.username ? "@" : null}
                                {res.username}
                              </div>
                              <br />
                              <div className="post-date">
                                <span className="post-time">
                                  {moment(
                                    new Date(res.date.seconds * 1000)
                                  ).format("MM/DD/YYYY HH:mm")}{" "}
                                </span>
                              </div>
                            </div>

                            {/* <div className="postbuttonreport">
                          <a className="postbuttonreported" href="/post/edit">
                            <i class="fa fa-flag"></i>
                          </a>
                        </div> */}

                            <div className="container-post4">
                              <div className="container-post5">
                                <Form className="formsize-post">
                                  <Form.Row>
                                    <Form.Group
                                      as={Col}
                                      className="้post-left col-lg-6 col-12"
                                      controlId="formGridName"
                                    >
                                      <Form.Label>
                                        ชื่อ - นามสกุลผู้โกง
                                      </Form.Label>
                                    </Form.Group>

                                    <Form.Group>
                                      <span className="spanpost">
                                        {res.name} {res.surname}
                                      </span>
                                    </Form.Group>
                                  </Form.Row>

                                  <Form.Row>
                                    <Form.Group
                                      as={Col}
                                      className="post-left col-lg-6 col-12"
                                      controlId="formGridId"
                                    >
                                      <Form.Label>
                                        เลขที่บัญชี (ผู้โกง)
                                      </Form.Label>
                                    </Form.Group>

                                    <Form.Group>
                                      <span className="spanpost">
                                        {res.accountnumber}
                                      </span>
                                    </Form.Group>
                                  </Form.Row>

                                  <Form.Row>
                                    <Form.Group
                                      as={Col}
                                      className="post-left col-lg-6 col-12"
                                      controlId="formGridNameproduct"
                                    >
                                      <Form.Label>ชื่อสินค้า</Form.Label>
                                    </Form.Group>

                                    <Form.Group>
                                      <span className="spanpost">
                                        {res.nameproduct}{" "}
                                      </span>
                                    </Form.Group>
                                  </Form.Row>

                                  <Form.Row>
                                    <Form.Group
                                      as={Col}
                                      className="post-left col-lg-6 col-12"
                                      controlId="formGridPrice"
                                    >
                                      <Form.Label>จำนวนเงิน</Form.Label>
                                    </Form.Group>

                                    <Form.Group>
                                      <span className="spanpost">
                                        {res.money} บาท
                                      </span>
                                    </Form.Group>
                                  </Form.Row>

                                  <Form.Row>
                                    <Form.Group
                                      as={Col}
                                      className="post-left col-lg-6 col-12"
                                      controlId="formGridDate"
                                    >
                                      <Form.Label>วันที่โดนโกง</Form.Label>
                                    </Form.Group>

                                    <Form.Group>
                                      <span className="spanpost">
                                        {moment(
                                          new Date(res.datetimes.seconds * 1000)
                                        ).format("MM/DD/YYYY HH:mm")}{" "}
                                      </span>
                                    </Form.Group>
                                  </Form.Row>

                                  <Form.Row>
                                    <Form.Group
                                      as={Col}
                                      className="post-left col-lg-6 col-12"
                                      controlId="formGridDate"
                                    >
                                      <Form.Label>
                                        จำนวนครั้งที่ {res.name} {res.surname}{" "}
                                        ถูกแจ้ง{" "}
                                      </Form.Label>
                                    </Form.Group>
                                    <Form.Group>
                                      <span className="spanpost">
                                        {res.count} ครั้ง
                                      </span>
                                    </Form.Group>
                                  </Form.Row>
                                  <Form.Row>
                                    <Form.Group
                                      as={Col}
                                      className="post-left col-lg-6 col-12"
                                      controlId="formGridPrice"
                                    >
                                      <Form.Label>
                                        {" "}
                                        ยอดเงินรวมทั้งหมดที่โกงไป{" "}
                                      </Form.Label>
                                    </Form.Group>

                                    <Form.Group>
                                      <span className="spanpost">
                                        {res.summoney} บาท
                                      </span>
                                    </Form.Group>
                                  </Form.Row>
                                </Form>
                                <div className="postother">
                                  <Link
                                    className="postother1"
                                    onClick={() => (
                                      history.push(`/mypost/${res.uid}`),
                                      window.location.reload(true)
                                    )}
                                  >
                                    ดูเพิ่มเติม
                                  </Link>
                                </div>
                              </div>

                              <div className="line-post1"></div>
                              <div className="container-post6">
                                <Commentitem postid={res.uid} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>
                    {" "}
                    {loading ? (
                      <ClipLoader />
                    ) : (
                      <div>
                        {result ? (
                          result.map((res) => {
                            return (
                              <div>
                                <div className="container-post2">
                                  <div className="cotainer-post3">
                                    <div className="post-profile-img">
                                      {res.photoURL ? (
                                        <img
                                          className="img-circle"
                                          src={`${res.photoURL.url}`}
                                        />
                                      ) : (
                                        <img
                                          className="img-circle"
                                          src={"/img/profile.png"}
                                        />
                                      )}
                                      <div className="post-name">
                                        {res.username ? "@" : null}
                                        {res.username}
                                      </div>
                                      <br />
                                      <div className="post-date">
                                        <span className="post-time">
                                          {moment(
                                            new Date(res.date.seconds * 1000)
                                          ).format("MM/DD/YYYY HH:mm")}{" "}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="container-post4">
                                      <div className="container-post5">
                                        <Form className="formsize-post">
                                          <Form.Row>
                                            <Form.Group
                                              as={Col}
                                              className="้post-left col-lg-6 col-12"
                                              controlId="formGridName"
                                            >
                                              <Form.Label>
                                                ชื่อ - นามสกุลผู้โกง
                                              </Form.Label>
                                            </Form.Group>

                                            <Form.Group>
                                              <span className="spanpost">
                                                {res.name} {res.surname}
                                              </span>
                                            </Form.Group>
                                          </Form.Row>

                                          <Form.Row>
                                            <Form.Group
                                              as={Col}
                                              className="post-left col-lg-6 col-12"
                                              controlId="formGridId"
                                            >
                                              <Form.Label>
                                                เลขที่บัญชี (ผู้โกง)
                                              </Form.Label>
                                            </Form.Group>

                                            <Form.Group>
                                              <span className="spanpost">
                                                {res.accountnumber}
                                              </span>
                                            </Form.Group>
                                          </Form.Row>

                                          <Form.Row>
                                            <Form.Group
                                              as={Col}
                                              className="post-left col-lg-6 col-12"
                                              controlId="formGridNameproduct"
                                            >
                                              <Form.Label>
                                                ชื่อสินค้า
                                              </Form.Label>
                                            </Form.Group>

                                            <Form.Group>
                                              <span className="spanpost">
                                                {res.nameproduct}{" "}
                                              </span>
                                            </Form.Group>
                                          </Form.Row>

                                          <Form.Row>
                                            <Form.Group
                                              as={Col}
                                              className="post-left col-lg-6 col-12"
                                              controlId="formGridPrice"
                                            >
                                              <Form.Label>จำนวนเงิน</Form.Label>
                                            </Form.Group>

                                            <Form.Group>
                                              <span className="spanpost">
                                                {res.money} บาท
                                              </span>
                                            </Form.Group>
                                          </Form.Row>

                                          <Form.Row>
                                            <Form.Group
                                              as={Col}
                                              className="post-left col-lg-6 col-12"
                                              controlId="formGridDate"
                                            >
                                              <Form.Label>
                                                วันที่โดนโกง
                                              </Form.Label>
                                            </Form.Group>

                                            <Form.Group>
                                              <span className="spanpost">
                                                {moment(
                                                  new Date(
                                                    res.datetimes.seconds * 1000
                                                  )
                                                ).format(
                                                  "MM/DD/YYYY HH:mm"
                                                )}{" "}
                                              </span>
                                            </Form.Group>
                                          </Form.Row>

                                          <Form.Row>
                                            <Form.Group
                                              as={Col}
                                              className="post-left col-lg-6 col-12"
                                              controlId="formGridDate"
                                            >
                                              <Form.Label>
                                                จำนวนครั้งที่ {res.name}{" "}
                                                {res.surname} ถูกแจ้ง{" "}
                                              </Form.Label>
                                            </Form.Group>
                                            <Form.Group>
                                              <span className="spanpost">
                                                {res.count} ครั้ง
                                              </span>
                                            </Form.Group>
                                          </Form.Row>
                                          <Form.Row>
                                            <Form.Group
                                              as={Col}
                                              className="post-left col-lg-6 col-12"
                                              controlId="formGridPrice"
                                            >
                                              <Form.Label>
                                                {" "}
                                                ยอดเงินรวมทั้งหมดที่โกงไป{" "}
                                              </Form.Label>
                                            </Form.Group>

                                            <Form.Group>
                                              <span className="spanpost">
                                                {res.summoney} บาท
                                              </span>
                                            </Form.Group>
                                          </Form.Row>
                                        </Form>
                                        <div className="postother">
                                          <Link
                                            className="postother1"
                                            onClick={() => (
                                              history.push(
                                                `/mypost/${res.uid}`
                                              ),
                                              window.location.reload(true)
                                            )}
                                          >
                                            ดูเพิ่มเติม
                                          </Link>
                                        </div>
                                      </div>

                                      <div className="line-post1"></div>
                                      <div className="container-post6">
                                        <Commentitem postid={res.uid} />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div></div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="column-post-right1">
            <a href="https://www.facebook.com/MonkeyFruad-105444291586616">
              <div className="container-postright1">
                <div className="post-linkpost2">
                  ติดต่อเพจน้องพะโล้ <br />
                  เพื่ออัพเดทข่าวสารและพูดคุยกันได้ที่นี่
                </div>
                <div className="post-img1">
                  <img className="facebook" src="/img/facebook.jpg" />
                </div>
              </div>
            </a>
            <div className="biggroup">
              <div className="container-postright2">
                <div className="post-group1">
                  เรียงตาม :
                  <select
                    as="select"
                    name="post-groupsorting1"
                    className="post-groupsorting1"
                    onChange={e => Setsortvalue(e.target.value)}
            
                  >
                    <option   value="ใหม่ล่าสุด">ใหม่ล่าสุด</option>
                    <option   value="จำนวนเงินมากที่สุด">จำนวนเงินมากที่สุด</option>
                  </select>
                </div>
                <div className="line-postgroup1"></div>
                <div className="post-group2">
                  <div className="post-namegroup1">ช่องทางที่โดนโกง</div>
                { checkfacebook ?
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline1"
                      onChange={(e) => Setfacebook(e.target.value)}
                      onClick={() => Setcheckfacebook(!checkfacebook)}
                      checked
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline1"
                    >
                      Facebook
                    </label>
                  </div>
                  :
                  <div class="custom-control custom-checkbox groupcheckbox1">
                  <input
                    type="checkbox"
                    class="custom-control-input groupcheckboxinput1"
                    id="defaultInline1"
                    onChange={(e) => Setfacebook(e.target.value)}
                    onClick={() => Setcheckfacebook(!checkfacebook)}
                  ></input>
                  <label
                    class="custom-control-label groupcheckboxlabel1"
                    for="defaultInline1"
                  >
                    Facebook
                  </label>
                </div>
                }
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline2"
                      onChange={(e) => Setline(e.target.value)}
                      onClick={() => Setcheckline(!checkline)}
                    />
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline2"
                    >
                      Line
                    </label>
                  </div>
                { checkinstagram ?
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline3"
                      onChange={(e) => Setinstagram(e.target.value)}
                      onClick={() => Setcheckinstagram(!checkinstagram)}
                      checked
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline3"
                    >
                      Instagram
                    </label>
                  </div>
                  :
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline3"
                      onChange={(e) => Setinstagram(e.target.value)}
                      onClick={() => Setcheckinstagram(!checkinstagram)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline3"
                    >
                      Instagram
                    </label>
                  </div>
                }
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline4"
                      onChange={(e) => Settwitter(e.target.value)}
                      onClick={() => Setchecktwitter(!checktwitter)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline4"
                    >
                      Twitter
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox1">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput1"
                      id="defaultInline5"
                      onChange={(e) => Setother(e.target.value)}
                      onClick={() => Setcheckother(!checkother)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline5"
                    >
                      อื่นๆ
                    </label>
                  </div>
                </div>
                <div className="line-postgroup2"></div>
                <div className="post-group3">
                  <div className="post-namegroup2">หมวดหมู่</div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline1-2"
                      onChange={(e) => Setcloth(e.target.value)}
                      onClick={() => Setcheckcloth(!checkcloth)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline1-2"
                    >
                      เสื้อผ้า
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline2-2"
                      onChange={(e) => Setassesory(e.target.value)}
                      onClick={() => Setcheckassesory(!checkassesory)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline2-2"
                    >
                      เครื่องประดับ
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline3-2"
                      onChange={(e) => Setshoe(e.target.value)}
                      onClick={() => Setcheckshoe(!checkshoe)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline3-2"
                    >
                      รองเท้า
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline4-2"
                      onChange={(e) => Setbag(e.target.value)}
                      onClick={() => Setcheckbag(!checkbag)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline4-2"
                    >
                      กระเป๋า
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline5-2"
                      onChange={(e) => Setphone(e.target.value)}
                      onClick={() => Setcheckphone(!checkphone)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel1"
                      for="defaultInline5-2"
                    >
                      มือถือและอุปกรณ์เสริม
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline6"
                      onChange={(e) => Setfood(e.target.value)}
                      onClick={() => Setcheckfood(!checkfood)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline6"
                    >
                      อาหารและเครื่องดื่ม
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline7"
                      onChange={(e) => Setfoodwealth(e.target.value)}
                      onClick={() => Setcheckfoodwealth(!checkfoodwealth)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline7"
                    >
                      อาหารเสริมและผลิตภัณฑ์สุขภาพ
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline8"
                      onChange={(e) => Setbeauty(e.target.value)}
                      onClick={() => Setcheckbeauty(!checkbeauty)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline8"
                    >
                      เครื่องสำอางค์และอุปกรณ์เสริมความงาม
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline9"
                      onChange={(e) => Setcomputer(e.target.value)}
                      onClick={() => Setcheckcomputer(!checkcomputer)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline9"
                    >
                      คอมพิวเตอร์แล็ปท็อป
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline10"
                      onChange={(e) => Setcamera(e.target.value)}
                      onClick={() => Setcheckcamera(!checkcamera)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline10"
                    >
                      กล้องและอุปกรณ์ถ่ายภาพ
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline11"
                      onChange={(e) => Setsport(e.target.value)}
                      onClick={() => Setchecksport(!checksport)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline11"
                    >
                      กีฬาและกิจกรรมกลางแจ้ง
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline12"
                      onChange={(e) => Setmedia(e.target.value)}
                      onClick={() => Setcheckmedia(!checkmedia)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline12"
                    >
                      สื่อบันเทิงภายในบ้าน
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline13"
                      onChange={(e) => Setgame(e.target.value)}
                      onClick={() => Setcheckgame(!checkgame)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline13"
                    >
                      เกมส์และฮ๊อบบี้
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline14"
                      onChange={(e) => Setcar(e.target.value)}
                      onClick={() => Setcheckcar(!checkcar)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline14"
                    >
                      ยานยนต์
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline15"
                      onChange={(e) => Setticket(e.target.value)}
                      onClick={() => Setcheckticket(!checkticket)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline15"
                    >
                      ตั๋วและบัตรกำนัน
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline16"
                      onChange={(e) => Setelectronic(e.target.value)}
                      onClick={() => Setcheckelectronic(!checkelectronic)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline16"
                    >
                      เครื่องใช้ไฟฟ้า
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline17"
                      onChange={(e) => Setfurniture(e.target.value)}
                      onClick={() => Setcheckfurniture(!checkfurniture)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline17"
                    >
                      เฟอร์นิเจอร์และของตกแต่งบ้าน
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline18"
                      onChange={(e) => Setpet(e.target.value)}
                      onClick={() => Setcheckpet(!checkpet)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline18"
                    >
                      สัตว์เลี้ยง
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline19"
                      onChange={(e) => Setkian(e.target.value)}
                      onClick={() => Setcheckkian(!checkkian)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline19"
                    >
                      เครื่องเขียน
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline20"
                      onChange={(e) => Setbook(e.target.value)}
                      onClick={() => Setcheckbook(!checkbook)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline20"
                    >
                      หนังสือ
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline21"
                      onChange={(e) => Setmusic(e.target.value)}
                      onClick={() => Setcheckmusic(!checkmusic)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline21"
                    >
                      เครื่องดนตรี
                    </label>
                  </div>
                  <div class="custom-control custom-checkbox groupcheckbox2">
                    <input
                      type="checkbox"
                      class="custom-control-input groupcheckboxinput2"
                      id="defaultInline22"
                      onChange={(e) => Setothercatalog(e.target.value)}
                      onClick={() => Setcheckothercatalog(!checkothercatalog)}
                    ></input>
                    <label
                      class="custom-control-label groupcheckboxlabel2"
                      for="defaultInline22"
                    >
                      อื่นๆ
                    </label>
                  </div>
                </div>
                <div className="line-postgroup3"></div>
                <div className="post-group4">
                  <div className="post-namegroup3">จำนวนเงิน</div>
                  <div className="row post-numbergroup1">
                    <input
                      type="number"
                      id="nameproduct"
                      pattern="[0-9]{1,}"
                      className="postnumber1"
                      onChange={(e) => Setsearchstart(parseInt(e.target.value))}
                      value={searchstart}
                    ></input>
                    <div className="post-numbergroup2">-</div>
                    <input
                      type="number"
                      id="nameproduct"
                      pattern="[0-9]{1,}"
                      className="postnumber2"
                      onChange={(e) => Setsearchend(parseInt(e.target.value))}
                      value={searchend}
                    ></input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </div>
  );
};

export default PostInstragram;
