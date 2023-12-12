import { VisualEditorRoot } from './components/VisualEditorRoot';
import './global.css';

// declare global {
//   interface Window {
//     cfInitVisualEditor: (element: HTMLElement, props: VisualEditorRootProps) => void;
//   }
// }

// (function (window) {
//   if (typeof window !== 'undefined') {
//     console.log('[VE::DEBUG] defining window.cfInitVisualEditor...');
//     window.cfInitVisualEditor = (element, props) => {
//       ReactDOM.createRoot(element).render(<VisualEditorRoot {...props} />);
//     };
//   }
// })(window);

// export { VisualEditorRoot };
export default VisualEditorRoot;
