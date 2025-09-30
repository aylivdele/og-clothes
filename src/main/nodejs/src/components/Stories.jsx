// import React, { useState } from 'react';
// import { Stories as InstaStories } from 'react-insta-stories'; // Исправлено
// import storiesData from '../data/store';
// import '../css/style.css';

// const MyStories = () => { // Переименовано
//   const [isViewerOpen, setViewerOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleStoryClick = (index) => {
//     setCurrentIndex(index);
//     setViewerOpen(true);
//   };

//   const formattedStories = storiesData.map(story => {
//     if (story.content) {
//       return { content: story.content };
//     } else {
//       return { 
//         url: story.url, 
//         type: story.type,
//         header: {
//           heading: story.username,
//         }
//       };
//     }
//   });

//   return (
//     <div className="stories-wrapper">
//       <div className="stories-bar">
//         {storiesData.map((story, index) => (
//           <div
//             key={story.id}
//             className="story-circle"
//             onClick={() => handleStoryClick(index)}
//           >
//             <img src={story.thumbnail} alt={story.username} />
//             <span>{story.username}</span>
//           </div>
//         ))}
//       </div>

//       {isViewerOpen && (
//         <div className="story-viewer-overlay" onClick={() => setViewerOpen(false)}>
//           <div className="story-viewer" onClick={(e) => e.stopPropagation()}>
//             <InstaStories
//               stories={formattedStories}
//               defaultInterval={5000}
//               width={400}
//               height={600}
//               currentIndex={currentIndex}
//               onAllStoriesEnd={() => setViewerOpen(false)}
//               onStoryEnd={(idx) => {
//                 if (idx === formattedStories.length - 1) {
//                   setViewerOpen(false);
//                 }
//               }}
//               keyboardNavigation
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyStories; // Соответствует новому имени