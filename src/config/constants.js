import { HiUsers } from "react-icons/hi"; 
import { BsFillSendPlusFill } from "react-icons/bs"; 
import { MdAddLocationAlt } from "react-icons/md"; 
import { MdAirplaneTicket } from "react-icons/md"; 
import { MdLocationOn } from "react-icons/md"; 

import engImage from "../images/logos/united-kingdom.png"
import rusImage from "../images/logos/russia.png"
import qarImage from "../images/logos/karakalpakstan.png"

export const getBtnData = (t) => [
    {
        id: 1, path : "/", icon : MdLocationOn, title : t("destinations")
    },
    {
        id: 2, path : "/tours", icon : MdAirplaneTicket, title : t("tours")
    },
    {
        id: 3, path : "/create-destination", icon : MdAddLocationAlt, title : t("create-destination")
    },
    {
        id: 4, path : "/create-tour", icon : BsFillSendPlusFill, title : t("create-tour")
    },
    {
        id: 5, path : "/users", icon : HiUsers, title : t("users")
    }
] 

export const langData = [
    {
        id : 1, image : engImage, title : "ENG"
    },
    {
        id : 2, image : rusImage, title : "RUS"
    },
    {
        id : 3, image : qarImage, title : "QAR"
    }
]