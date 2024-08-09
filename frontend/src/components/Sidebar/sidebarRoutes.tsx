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
        link: "/iv-offers",
        text: "IV Offers",
        icon: <FaRegCalendarCheck className="h-5 w-5" />,
      },
      {
        link: "/iv-rejections",
        text: "IV Rejections",
        icon: <FaTimesCircle className="h-5 w-5" />,
      },
      {
        link: "/iv-dropped",
        text: "IV Dropped",
        icon: <FaRegCalendarMinus className="h-5 w-5" />,
      },
      {
        link: "/iv-logistics",
        text: "IV Logistics/Open Spots",
        icon: <FaMapSigns className="h-5 w-5" />,
      },
      {
        link: "/iv-questions",
        text: "IV Questions",
        icon: <FaQuestionCircle className="h-5 w-5" />,
      },
      {
        link: "/iv-impressions",
        text: "IV Impressions",
        icon: <FaThumbsUp className="h-5 w-5" />,
      },
      {
        link: "/loi-response",
        text: "LOInterest Response",
        icon: <FaEnvelopeOpenText className="h-5 w-5" />,
      },
      {
        link: "/loi-intent",
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
        link: "/applicant-data",
        text: "Applicant Data",
        icon: <FaUserGraduate className="h-5 w-5" />,
      },
      {
        link: "/img-applicant-data",
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
        link: "/m4-intern-impressions",
        text: "M4/Intern Impressions",
        icon: <FaClipboardList className="h-5 w-5" />,
      },
      {
        link: "/malignant",
        text: "Malignant",
        icon: <FaSkullCrossbones className="h-5 w-5" />,
      },
      {
        link: "/program-schedule",
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
        link: "/x-vs-y",
        text: "X vs Y",
        icon: <FaBalanceScale className="h-5 w-5" />,
      },
      {
        link: "/x-vs-y-img",
        text: "X vs Y (IMG)",
        icon: <FaBalanceScaleLeft className="h-5 w-5" />,
      },
      {
        link: "/cities",
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
        link: "/unofficial-rank-lists-do",
        text: "Unofficial Rank Lists (DO)",
        icon: <FaSortNumericDownAlt className="h-5 w-5" />,
      },
      {
        link: "/unofficial-rank-lists-img",
        text: "Unofficial Rank Lists (IMG)",
        icon: <FaSortAmountUp className="h-5 w-5" />,
      },
    ],
  },
];

export default sidebarRoutes;
