// import React from 'react';

// // const Slider = (props) => {
// //   const {
// //     altText, banners, defaultBanner, duration, height, random
// //   } = props;
// //   return (
// //     <>
// //       <img src={banners} alt={altText} />
// //     </>
// //   );
// // };
// // export default Slider;

// class Slider extends React.Component {
//   componentDidMount = () => {
//     this.id = setInterval(() => {

//     }, 2000);
//   }

//   componentWillUnmount =() => {
//     clearInterval(this.id);
//   }

//   render() {
//     const {
//       altText, banners, defaultBanner, duration, height, random,
//     } = this.props;
//     const defaultImage = defaultBanner ? (
//       <>
//         {' '}
//         <img src={banners[0]} alt={altText} />
//       </>
//     ) : (
//       <>
//         {' '}
//         <img src={banners} alt={altText} />
//       </>
//     );
//     return defaultImage;
//   }
// }
