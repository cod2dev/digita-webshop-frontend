import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import navigationIcon from "../../../../Assets/Icons/right-arrow.svg";

export const Container = styled(Box)(({theme}) => ({
    position: 'relative',
    width: '100%',
    [theme.breakpoints.up("xs")]: {
        maxWidth: "90vw",
    },
    [theme.breakpoints.up("lg")]: {
        maxWidth: "1150px",
    },
    ".swiper": {
        paddingBottom: '73px',
        width: '100%',
    },
    ".swiper-pagination-bullet": {
        background: 'white',
        opacity: 1,
        margin: '10px!important'
    },
    ".swiper-horizontal>.swiper-pagination-bullets": {
        bottom: '0'
    },
    ".swiper-pagination-bullet-active": {
        position: 'relative',
        '&::before': {
            animation: 'spin-dot 2s linear infinite',
            top: '-110%',
            left: '-110%',
            borderRadius: '50%',
            position: 'absolute',
            content: '""',
            width: '22px',
            height: '22px',
            borderRight: ' 2px solid white',
            borderLeft: '2px solid transparent',
            borderTop: '2px solid white',
            borderBottom: '2px solid white',
        }
    },
    ".swiper-button-next,.swiper-button-prev": {
        [theme.breakpoints.down("lg")]: {
            display: 'none'
        },
        border: '1px solid rgba(255, 255, 255, 0.3)',
        width: '43px',
        height: '43px',
        '&::after': {
            backgroundImage: `url(${navigationIcon})`,
            backgroundSize: "contain",
            opacity: "0.3",
            width: '24px',
            height: '24px',
            content: '""'
        },
        "&:hover": {
            border: '1px solid rgba(255, 255, 255, 1)',
            '&:after': {
                opacity: "1",
            }
        }
    },
    '.swiper-button-next': {
        right: '-75px',
        top: '40%',
    },
    ".swiper-button-prev": {
        left: '-75px',
        top: '40%',
        transform: ' scale(-1, 1)'
    },
}))