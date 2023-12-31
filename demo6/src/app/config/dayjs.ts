import * as dayjs from 'dayjs';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';
import * as duration from 'dayjs/plugin/duration';
import * as relativeTime from 'dayjs/plugin/relativeTime';

// apppster-needle-i18n-language-dayjs-imports - apppster will import languages from dayjs here
import 'dayjs/locale/fr';
import 'dayjs/locale/ar-ly';
import 'dayjs/locale/en';

// DAYJS CONFIGURATION
dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);
