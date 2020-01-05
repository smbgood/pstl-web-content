import CMS from 'netlify-cms-app';
import Control  from '../components/cms/control';
import Preview from '../components/cms/preview';
CMS.registerWidget('mywidget', Control, Preview);