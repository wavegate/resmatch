import {
  FaRegCalendarCheck,
  FaTimesCircle,
  FaRegCalendarMinus,
  FaMapSigns,
  FaQuestionCircle,
  FaThumbsUp,
  FaEnvelopeOpenText,
  FaEnvelope,
  FaComments,
  FaEye,
  FaUserGraduate,
  FaUserMd,
  FaChartBar,
  FaMedal,
  FaClipboardList,
  FaSkullCrossbones,
  FaCalendarAlt,
  FaHandshake,
  FaMicroscope,
  FaListUl,
  FaListOl,
  FaBalanceScale,
  FaBalanceScaleLeft,
  FaCity,
  FaSortNumericDown,
  FaSortNumericDownAlt,
  FaSortAmountUp,
  FaInfoCircle,
} from "react-icons/fa";

const sidebarRoutes = [
  {
    heading: "Interview Info",
    items: [
      {
        link: "/invite",
        text: "IV Offers",
        icon: <FaRegCalendarCheck className="h-5 w-5" />,
      },
      {
        link: "/rejection",
        text: "IV Rejections",
        icon: <FaTimesCircle className="h-5 w-5" />,
      },
      {
        link: "/dropped",
        text: "IV Dropped",
        icon: <FaRegCalendarMinus className="h-5 w-5" />,
      },
      {
        link: "/logistics",
        text: "IV Logistics/Open Spots",
        icon: <FaMapSigns className="h-5 w-5" />,
      },
      {
        link: "/question",
        text: "IV Questions",
        icon: <FaQuestionCircle className="h-5 w-5" />,
      },
      {
        link: "/impression",
        text: "IV Impressions",
        icon: <FaThumbsUp className="h-5 w-5" />,
      },
      {
        link: "/lointerest-response",
        text: "LOInterest Response",
        icon: <FaEnvelopeOpenText className="h-5 w-5" />,
      },
      {
        link: "/lointent-response",
        text: "LOIntent Response",
        icon: <FaEnvelope className="h-5 w-5" />,
      },
      {
        link: "/post-iv-communication",
        text: "Post-IV Communication",
        icon: <FaComments className="h-5 w-5" />,
      },
      {
        link: "/second-look",
        text: "Second Look",
        icon: <FaEye className="h-5 w-5" />,
      },
    ],
  },
  {
    heading: "Applicant Info",
    items: [
      {
        link: "/user",
        text: "Applicant Data",
        icon: <FaUserGraduate className="h-5 w-5" />,
      },
      {
        link: "/img-user",
        text: "IMG Applicant Data",
        icon: <FaUserMd className="h-5 w-5" />,
      },
      {
        link: "/rank-tally",
        text: "Rank Tally",
        icon: <FaChartBar className="h-5 w-5" />,
      },
    ],
  },
  {
    heading: "Program Info",
    items: [
      {
        link: "/program",
        text: "Program Overview",
        icon: <FaInfoCircle className="h-5 w-5" />, // Represents informational content
      },
      {
        link: "/fame-shame",
        text: "Name Fame/Shame",
        icon: <FaMedal className="h-5 w-5" />,
      },
      {
        link: "/m4-intern-impression",
        text: "M4/Intern Impressions",
        icon: <FaClipboardList className="h-5 w-5" />,
      },
      {
        link: "/malignant",
        text: "Malignant",
        icon: <FaSkullCrossbones className="h-5 w-5" />,
      },
      {
        link: "/schedule-details",
        text: "Program Schedule/Details",
        icon: <FaCalendarAlt className="h-5 w-5" />,
      },
      {
        link: "/fellowship-match",
        text: "Fellowship Match",
        icon: <FaHandshake className="h-5 w-5" />,
      },
      {
        link: "/pstp",
        text: "PSTP",
        icon: <FaMicroscope className="h-5 w-5" />,
      },
      {
        link: "/tier-list",
        text: "Tier List",
        icon: <FaListUl className="h-5 w-5" />,
      },
      {
        link: "/tier-list-img",
        text: "Tier List (IMG)",
        icon: <FaListOl className="h-5 w-5" />,
      },
      {
        link: "/x-or-y",
        text: "X vs Y",
        icon: <FaBalanceScale className="h-5 w-5" />,
      },
      {
        link: "/x-or-y-img",
        text: "X vs Y (IMG)",
        icon: <FaBalanceScaleLeft className="h-5 w-5" />,
      },
      {
        link: "/city",
        text: "Cities",
        icon: <FaCity className="h-5 w-5" />,
      },
    ],
  },
  {
    heading: "Rank Data",
    items: [
      {
        link: "/rank-list",
        text: "Unofficial Rank Lists (MD)",
        icon: <FaSortNumericDown className="h-5 w-5" />,
      },
      {
        link: "/rank-list-do",
        text: "Unofficial Rank Lists (DO)",
        icon: <FaSortNumericDownAlt className="h-5 w-5" />,
      },
      {
        link: "/rank-list-img",
        text: "Unofficial Rank Lists (IMG)",
        icon: <FaSortAmountUp className="h-5 w-5" />,
      },
    ],
  },
];

export default sidebarRoutes;
