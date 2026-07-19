import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Globe, Swords, Cloud, Boxes, Bot, ChevronDown, type LucideIcon } from 'lucide-react';
import { useHeadingReveal } from '../hooks/use-heading-reveal';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  /** Brand icon path (Simple Icons) — used for tools/frameworks with a real logo. */
  svgPath?: string;
  /** Fallback icon for concepts/skills with no official brand mark. */
  icon?: LucideIcon;
  color: string;
  category: string;
  level: number;
}

// Brand SVG paths from Simple Icons (https://simpleicons.org/)
const skills: Skill[] = [
  {
    name: 'Java',
    svgPath: 'M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0 0-8.216 2.051-4.292 6.573M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.069-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0 .001.07-.062.09-.118M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627M9.734 23.924c4.322.277 10.959-.153 11.116-2.198 0 0-.302.775-3.572 1.391-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.639',
    color: '#E51F24',
    category: 'Languages',
    level: 95,
  },
  {
    name: 'Python',
    svgPath: 'M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05 1.07.13zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09-.33.22zM21.1 6.11l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.04zM9.9 12.44l.23-.33.08-.41-.08-.41-.23-.33-.33-.22-.41-.1-.41.1-.33.22-.23.33-.08.41.08.41.23.33.33.22.41.1.41-.1.33-.22z',
    color: '#3776AB',
    category: 'Languages',
    level: 90,
  },
  {
    name: 'TypeScript',
    svgPath: 'M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z',
    color: '#3178C6',
    category: 'Languages',
    level: 88,
  },
  {
    name: 'JavaScript',
    svgPath: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z',
    color: '#F7DF1E',
    category: 'Languages',
    level: 85,
  },
  {
    name: 'Selenium',
    svgPath: 'M23.174 3.468l-7.416 8.322a.228.228 0 0 1-.33 0l-3.786-3.9a.228.228 0 0 1 0-.282L12.872 6a.228.228 0 0 1 .366 0l2.106 2.346a.228.228 0 0 0 .342 0l5.94-8.094A.162.162 0 0 0 21.5 0H.716a.174.174 0 0 0-.174.174v23.652A.174.174 0 0 0 .716 24h22.566a.174.174 0 0 0 .174-.174V3.6a.162.162 0 0 0-.282-.132zM6.932 21.366a5.706 5.706 0 0 1-4.05-1.44.222.222 0 0 1 0-.288l.882-1.236a.222.222 0 0 1 .33-.036 4.338 4.338 0 0 0 2.964 1.158c1.158 0 1.722-.534 1.722-1.098 0-1.752-5.7-.552-5.7-4.278 0-1.65 1.428-3 3.756-3a5.568 5.568 0 0 1 3.708 1.242.222.222 0 0 1 0 .3l-.906 1.2a.222.222 0 0 1-.318.036 4.29 4.29 0 0 0-2.706-.936c-.906 0-1.41.402-1.41.996 0 1.572 5.688.522 5.688 4.2.006 1.812-1.284 3.18-3.96 3.18zm12.438-3.432a.192.192 0 0 1-.192.192h-5.202a.06.06 0 0 0-.06.066 1.986 1.986 0 0 0 2.106 1.638 3.264 3.264 0 0 0 1.8-.6.192.192 0 0 1 .276.042l.636.93a.198.198 0 0 1-.042.264 4.71 4.71 0 0 1-2.892.9 3.726 3.726 0 0 1-3.93-3.87 3.744 3.744 0 0 1 3.81-3.852c2.196 0 3.684 1.644 3.684 4.05zm-3.684-2.748a1.758 1.758 0 0 0-1.8 1.56.06.06 0 0 0 .06.066h3.492a.06.06 0 0 0 .06-.066 1.698 1.698 0 0 0-1.812-1.56Z',
    color: '#43B02A',
    category: 'Testing',
    level: 95,
  },
  {
    name: 'Appium',
    svgPath: 'M11.923 0C5.937 0 .976 4.384.07 10.115a11.943 11.943 0 0 1 7.645-2.754 11.982 11.982 0 0 1 9.43 4.58 11.942 11.942 0 0 0 1.015-8.769 12.066 12.066 0 0 0-.626-1.772l-.003-.008A11.968 11.968 0 0 0 11.923 0Zm7.721 2.754A12.002 12.002 0 0 1 9.398 16.521a12.082 12.082 0 0 0 9.02 5.617c.24-.119.766-.51 1.224-.89A11.971 11.971 0 0 0 23.995 12a11.98 11.98 0 0 0-4.35-9.247zM9.33 7.557a12.159 12.159 0 0 0-2.647.401A11.944 11.944 0 0 0 .01 12.595l-.005.006c.021.427.065.853.131 1.275C1.037 19.61 6 24 11.991 24c1.45 0 2.887-.26 4.243-.773a12 12 0 0 1-6.905-15.67z',
    color: '#662D91',
    category: 'Testing',
    level: 92,
  },
  {
    name: 'Playwright',
    svgPath: 'M23.996 7.462c-.056.837-.257 2.135-.716 3.85-.995 3.715-4.27 10.874-10.42 9.227-6.15-1.65-5.407-9.487-4.412-13.201.46-1.716.934-2.94 1.305-3.694.42-.853.846-.289 1.815.523.684.573 2.41 1.791 5.011 2.488 2.601.697 4.706.506 5.583.352 1.245-.219 1.897-.494 1.834.455Zm-9.807 3.863s-.127-1.819-1.773-2.286c-1.644-.467-2.613 1.04-2.613 1.04Zm4.058 4.539-7.769-2.172s.446 2.306 3.338 3.153c2.862.836 4.43-.98 4.43-.981Zm2.701-2.51s-.13-1.818-1.773-2.286c-1.644-.469-2.612 1.038-2.612 1.038ZM8.57 18.23c-4.749 1.279-7.261-4.224-8.021-7.08C.197 9.831.044 8.832.003 8.188c-.047-.73.455-.52 1.415-.354.677.118 2.3.261 4.308-.28a11.28 11.28 0 0 0 2.41-.956c-.058.197-.114.4-.17.61-.433 1.618-.827 4.055-.632 6.426-1.976.732-2.267 2.423-2.267 2.423l2.524-.715c.227 1.002.6 1.987 1.15 2.838a5.914 5.914 0 0 1-.171.049Zm-4.188-6.298c1.265-.333 1.363-1.631 1.363-1.631l-3.374.888s.745 1.076 2.01.743Z',
    color: '#2EAD33',
    category: 'Testing',
    level: 90,
  },
  {
    name: 'WebdriverIO',
    svgPath: 'M1.875 0C0.836 0 0 0.836 0 1.875v20.25C0 23.164 0.836 24 1.875 24h20.25C23.164 24 24 23.164 24 22.125V1.875C24 0.836 23.164 0 22.125 0ZM2.25 6H3V18H2.25ZM9.335 6H10.125L5.29 18H4.499ZM16.125 6c3.314 0 6 2.686 6 6 0 3.314-2.686 6-6 6-3.314 0-6-2.686-6-6 0-3.314 2.686-6 6-6zm0 0.75c-2.899 0-5.25 2.351-5.25 5.25 0 2.899 2.351 5.25 5.25 5.25 2.899 0 5.25-2.351 5.25-5.25 0-2.899-2.351-5.25-5.25-5.25z',
    color: '#EA5906',
    category: 'Testing',
    level: 88,
  },
  {
    name: 'Perfecto',
    icon: Cloud,
    color: '#00B0FF',
    category: 'Testing',
    level: 85,
  },
  {
    name: 'Digital.ai',
    icon: Boxes,
    color: '#6E44FF',
    category: 'Testing',
    level: 82,
  },
  {
    name: 'Git',
    svgPath: 'M23.546 10.93L13.067.452c-.604-.604-1.582-.604-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.604 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.604-.404-.541-.541-.674-1.336-.404-1.996L7.614 3.675 .45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187',
    color: '#F05032',
    category: 'DevOps',
    level: 92,
  },
  {
    name: 'GitHub',
    svgPath: 'M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12',
    color: '#181717',
    category: 'DevOps',
    level: 90,
  },
  {
    name: 'GitLab',
    svgPath: 'M23.955 13.587l-1.342-4.135-2.664-8.189a.455.455 0 0 0-.867 0L16.418 9.45H7.582L4.918 1.263a.455.455 0 0 0-.867 0L1.386 9.45.044 13.587a.924.924 0 0 0 .331 1.023L12 23.054l11.625-8.443a.924.924 0 0 0 .33-1.024',
    color: '#FC6D26',
    category: 'DevOps',
    level: 88,
  },
  {
    name: 'Docker',
    svgPath: 'M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z',
    color: '#2496ED',
    category: 'DevOps',
    level: 80,
  },
  {
    name: 'CI/CD',
    svgPath: 'M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm4.927 6.16h1.23v2.46h-1.23V6.16zm-9.854 0h1.23v2.46H7.073V6.16zM12 17.08a5.08 5.08 0 1 1 0-10.16 5.08 5.08 0 0 1 0 10.16zm0-8.62a3.54 3.54 0 1 0 0 7.08 3.54 3.54 0 0 0 0-7.08zm0 2.31a1.23 1.23 0 1 1 0 2.46 1.23 1.23 0 0 1 0-2.46z',
    color: '#2088FF',
    category: 'DevOps',
    level: 85,
  },
  {
    name: 'Linux',
    svgPath: 'M12.504 0c-.155 0-.315.008-.480.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 0 0-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.138.94-.457 1.224-.98.264-.482.395-1.13.498-1.857.784-.6 1.389-1.514 1.518-2.418.03-.188.044-.38.035-.57-.006-.22-.036-.44-.055-.65-.031-.33-.032-.663.021-.994.02-.168.055-.336.108-.5.06-.167.15-.334.258-.494.108-.157.228-.306.35-.444.49-.554.806-1.197.806-2.084 0-.855-.4-1.79-1.088-2.73-.688-.938-1.662-1.874-2.564-2.9-.9-1.027-1.755-2.142-2.185-3.455-.43-1.312-.455-2.825.127-4.618a.42.42 0 0 0 .008-.285c-.15-.514-.525-1.102-.84-1.564C9.78.37 9.44.088 9.104.035A.67.67 0 0 0 8.95.02C8.58.02 8.31.243 8.13.49c-.363.49-.48 1.09-.433 1.67.099 1.173.78 2.14 1.617 2.946.838.806 1.835 1.432 2.627 2.04.792.608 1.36 1.19 1.527 1.736.168.546-.02 1.14-.49 1.76-.47.62-1.23 1.274-1.97 2.018C10.67 13.404 9.76 14.42 9.24 15.62c-.52 1.197-.55 2.587.226 4.16.776 1.573 2.48 3.21 5.11 4.36l.26.112.285-.037c1.072-.14 2.03-.56 2.79-1.204.76-.644 1.32-1.51 1.576-2.525.255-1.014.21-2.13-.107-3.21-.318-1.078-.9-2.078-1.614-2.887-.365-.41-.75-.77-1.116-1.102-.365-.33-.71-.636-.97-.944-.26-.308-.41-.624-.375-.97.035-.346.207-.718.49-1.103.565-.77 1.5-1.596 2.186-2.41.686-.814 1.09-1.67.94-2.547-.155-.877-.845-1.615-1.804-2.09-.96-.476-2.193-.69-3.27-.6l-.01.001zM12 2.88c.195-.002.39.01.583.034.193.024.383.06.568.11.185.05.363.113.534.186.17.073.332.16.484.258.151.099.29.208.416.326.126.118.238.245.335.38.097.134.18.276.245.424.065.148.112.303.143.462.03.16.042.322.036.485-.006.163-.03.326-.07.488-.04.161-.097.32-.168.473-.071.154-.157.3-.256.437-.098.137-.21.264-.333.38-.122.115-.255.22-.396.31-.14.09-.29.164-.446.225-.155.06-.317.106-.483.136-.165.03-.335.043-.505.038-.17-.005-.339-.029-.504-.07-.165-.041-.325-.1-.478-.175-.153-.076-.298-.168-.433-.276-.134-.108-.258-.23-.369-.365-.11-.135-.207-.282-.288-.438-.081-.157-.146-.32-.195-.49-.049-.169-.08-.344-.093-.52-.013-.175-.008-.35.014-.524.021-.174.062-.346.12-.512.058-.166.133-.326.224-.477.09-.15.196-.291.316-.42.119-.128.252-.244.395-.344.144-.1.299-.186.46-.254.163-.069.33-.12.5-.153.17-.033.343-.05.515-.048z',
    color: '#FCC624',
    category: 'Systems',
    level: 88,
  },
  {
    name: 'Odoo',
    svgPath: 'M8.024 11.976A3.952 3.952 0 0 0 4.07 15.93a3.952 3.952 0 0 0 3.953 3.953 3.952 3.952 0 0 0 3.952-3.953 3.952 3.952 0 0 0-3.952-3.953zM12 4.07a3.952 3.952 0 0 0-3.952 3.953 3.952 3.952 0 0 0 3.952 3.952 3.952 3.952 0 0 0 3.953-3.952A3.952 3.952 0 0 0 12 4.07zm7.93 7.906a3.952 3.952 0 0 0-3.954 3.953 3.952 3.952 0 0 0 3.953 3.953 3.952 3.952 0 0 0 3.953-3.953 3.952 3.952 0 0 0-3.953-3.953z',
    color: '#714B67',
    category: 'Systems',
    level: 85,
  },
  {
    name: 'AI Testing',
    icon: Bot,
    color: '#412991',
    category: 'Emerging',
    level: 82,
  },
  {
    name: 'Mobile Testing',
    icon: Smartphone,
    color: '#22C55E',
    category: 'Testing',
    level: 92,
  },
  {
    name: 'Web Testing',
    icon: Globe,
    color: '#0EA5E9',
    category: 'Testing',
    level: 90,
  },
  {
    name: 'Karate',
    icon: Swords,
    color: '#F43F5E',
    category: 'Testing',
    level: 85,
  },
  {
    name: 'GitHub Actions',
    svgPath: 'M10.984 13.836a.5.5 0 0 1-.353-.146l-.745-.743a.5.5 0 1 1 .706-.708l.392.391 1.181-1.18a.5.5 0 0 1 .708.707l-1.535 1.533a.504.504 0 0 1-.354.146zm9.353-.147l1.534-1.532a.5.5 0 0 0-.707-.707l-1.181 1.18-.392-.391a.5.5 0 1 0-.706.708l.746.743a.497.497 0 0 0 .706-.001zM4.527 7.452l2.557-1.585A1 1 0 0 0 7.09 4.17L4.533 2.56A1 1 0 0 0 3 3.406v3.196a1.001 1.001 0 0 0 1.527.85zm2.03-2.436L4 6.602V3.406l2.557 1.61zM24 12.5c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3h-2.08a3.503 3.503 0 0 1-3.46 3 3.502 3.502 0 0 1-3.46-3h-.558c-.972 0-1.85-.399-2.482-1.042V17c0 1.654 1.346 3 3 3h.04c.244-1.693 1.7-3 3.46-3 1.93 0 3.5 1.57 3.5 3.5S13.43 24 11.5 24a3.502 3.502 0 0 1-3.46-3H8c-2.206 0-4-1.794-4-4V9.899A5.008 5.008 0 0 1 0 5c0-2.757 2.243-5 5-5s5 2.243 5 5a5.005 5.005 0 0 1-4.952 4.998A2.482 2.482 0 0 0 7.482 12h.558c.244-1.693 1.7-3 3.46-3a3.502 3.502 0 0 1 3.46 3h2.08a3.503 3.503 0 0 1 3.46-3c1.93 0 3.5 1.57 3.5 3.5zm-15 8c0 1.378 1.122 2.5 2.5 2.5s2.5-1.122 2.5-2.5-1.122-2.5-2.5-2.5S9 19.122 9 20.5zM5 9c2.206 0 4-1.794 4-4S7.206 1 5 1 1 2.794 1 5s1.794 4 4 4zm9 3.5c0-1.378-1.122-2.5-2.5-2.5S9 11.122 9 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm9 0c0-1.378-1.122-2.5-2.5-2.5S18 11.122 18 12.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5zm-13 8a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm2 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm12 0c0 1.93-1.57 3.5-3.5 3.5a3.503 3.503 0 0 1-3.46-3.002c-.007.001-.013.005-.021.005l-.506.017h-.017a.5.5 0 0 1-.016-.999l.506-.017c.018-.002.035.006.052.007A3.503 3.503 0 0 1 20.5 17c1.93 0 3.5 1.57 3.5 3.5zm-1 0c0-1.378-1.122-2.5-2.5-2.5S18 19.122 18 20.5s1.122 2.5 2.5 2.5 2.5-1.122 2.5-2.5z',
    color: '#2088FF',
    category: 'DevOps',
    level: 90,
  },
  {
    name: 'Bash',
    svgPath: 'M21.038,4.9l-7.577-4.498C13.009,0.134,12.505,0,12,0c-0.505,0-1.009,0.134-1.462,0.403L2.961,4.9 C2.057,5.437,1.5,6.429,1.5,7.503v8.995c0,1.073,0.557,2.066,1.462,2.603l7.577,4.497C10.991,23.866,11.495,24,12,24 c0.505,0,1.009-0.134,1.461-0.402l7.577-4.497c0.904-0.537,1.462-1.529,1.462-2.603V7.503C22.5,6.429,21.943,5.437,21.038,4.9z M15.17,18.946l0.013,0.646c0.001,0.078-0.05,0.167-0.111,0.198l-0.383,0.22c-0.061,0.031-0.111-0.007-0.112-0.085L14.57,19.29 c-0.328,0.136-0.66,0.169-0.872,0.084c-0.04-0.016-0.057-0.075-0.041-0.142l0.139-0.584c0.011-0.046,0.036-0.092,0.069-0.121 c0.012-0.011,0.024-0.02,0.036-0.026c0.022-0.011,0.043-0.014,0.062-0.006c0.229,0.077,0.521,0.041,0.802-0.101 c0.357-0.181,0.596-0.545,0.592-0.907c-0.003-0.328-0.181-0.465-0.613-0.468c-0.55,0.001-1.064-0.107-1.072-0.917 c-0.007-0.667,0.34-1.361,0.889-1.8l-0.007-0.652c-0.001-0.08,0.048-0.168,0.111-0.2l0.37-0.236 c0.061-0.031,0.111,0.007,0.112,0.087l0.006,0.653c0.273-0.109,0.511-0.138,0.726-0.088c0.047,0.012,0.067,0.076,0.048,0.151 l-0.144,0.578c-0.011,0.044-0.036,0.088-0.065,0.116c-0.012,0.012-0.025,0.021-0.038,0.028c-0.019,0.01-0.038,0.013-0.057,0.009 c-0.098-0.022-0.332-0.073-0.699,0.113c-0.385,0.195-0.52,0.53-0.517,0.778c0.003,0.297,0.155,0.387,0.681,0.396 c0.7,0.012,1.003,0.318,1.01,1.023C16.105,17.747,15.736,18.491,15.17,18.946z M19.143,17.859c0,0.06-0.008,0.116-0.058,0.145 l-1.916,1.164c-0.05,0.029-0.09,0.004-0.09-0.056v-0.494c0-0.06,0.037-0.093,0.087-0.122l1.887-1.129 c0.05-0.029,0.09-0.004,0.09,0.056V17.859z M20.459,6.797l-7.168,4.427c-0.894,0.523-1.553,1.109-1.553,2.187v8.833 c0,0.645,0.26,1.063,0.66,1.184c-0.131,0.023-0.264,0.039-0.398,0.039c-0.42,0-0.833-0.114-1.197-0.33L3.226,18.64 c-0.741-0.44-1.201-1.261-1.201-2.142V7.503c0-0.881,0.46-1.702,1.201-2.142l7.577-4.498c0.363-0.216,0.777-0.33,1.197-0.33 c0.419,0,0.833,0.114,1.197,0.33l7.577,4.498c0.624,0.371,1.046,1.013,1.164,1.732C21.686,6.557,21.12,6.411,20.459,6.797z',
    color: '#4EAA25',
    category: 'Systems',
    level: 85,
  },
];

const categories = ['All', 'Languages', 'Testing', 'DevOps', 'Systems', 'Emerging'];

// Dynamically compute stats from skill data
function computeStats() {
  const testing = skills.filter(s => s.category === 'Testing').length;
  const languages = skills.filter(s => s.category === 'Languages').length;
  const devops = skills.filter(s => s.category === 'DevOps').length;
  const systems = skills.filter(s => s.category === 'Systems').length + skills.filter(s => s.category === 'Emerging').length;
  return [
    { label: 'Test Frameworks', value: `${testing}+` },
    { label: 'Languages', value: `${languages}+` },
    { label: 'DevOps Tools', value: `${devops}+` },
    { label: 'Other Tools', value: `${systems}+` },
  ];
}

const stats = computeStats();

interface SkillIconProps {
  svgPath?: string;
  icon?: LucideIcon;
  color: string;
  size?: number;
  isHovered: boolean;
}

function SkillIcon({ svgPath, icon: Icon, color, size = 28, isHovered }: SkillIconProps) {
  if (Icon) {
    return (
      <Icon
        size={size}
        color={isHovered ? color : undefined}
        strokeWidth={1.75}
        className={`transition-all duration-300 ${isHovered ? '' : 'text-slate-400'}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isHovered ? color : 'currentColor'}
      className={`transition-all duration-300 ${isHovered ? '' : 'text-slate-400'}`}
      aria-hidden="true"
    >
      <path d={svgPath} />
    </svg>
  );
}

const VISIBLE_ROWS = 3;
const GRID_COLUMNS = 5;
const VISIBLE_COUNT = VISIBLE_ROWS * GRID_COLUMNS;
// On mobile the grid is 3 columns wide, so preview 3 cols x 2 rows.
const MOBILE_VISIBLE_COUNT = 3 * 2;
// Matches the `xs` breakpoint in tailwind.config.js where the grid
// switches from 3 to 5 columns.
const XS_MEDIA_QUERY = '(min-width: 475px)';

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && !window.matchMedia(XS_MEDIA_QUERY).matches
  );
  const headingRef = useRef<HTMLHeadingElement>(null);
  useHeadingReveal(headingRef);

  useEffect(() => {
    const mql = window.matchMedia(XS_MEDIA_QUERY);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  const visibleCount = isMobile ? MOBILE_VISIBLE_COUNT : VISIBLE_COUNT;

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills.filter(s => s.category === activeCategory);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    // Collapse back to the 3x5 preview whenever the category changes, so
    // switching filters doesn't leave a stale "expanded" grid.
    setShowAll(false);
  };

  const hasMore = filteredSkills.length > visibleCount;
  const visibleSkills = showAll ? filteredSkills : filteredSkills.slice(0, visibleCount);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const grid = gridRef.current;

    if (!section || !title || !grid) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          }
        }
      );

      // Cards flip in from alternating directions with a 3D rotation,
      // fanning out across the grid rather than rising uniformly.
      gsap.fromTo(
        grid.children,
        {
          rotateY: (i: number) => (i % 2 === 0 ? -90 : 90),
          scale: 0.6,
          opacity: 0,
          y: 25,
        },
        {
          rotateY: 0,
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: { each: 0.04, from: 'start' },
          duration: 0.6,
          ease: 'back.out(1.5)',
          transformPerspective: 600,
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Kill any existing floating tweens before starting new ones
    gsap.killTweensOf('.skill-card');

    // Floating idle animation has no purpose on touch devices (no hover
    // concept) and costs battery/perf, so skip it there.
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarsePointer) return;

    const cards = document.querySelectorAll('.skill-card');
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: Math.sin(i * 0.6) * 8,
        duration: 2.5 + i * 0.15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.08,
      });
    });

    return () => {
      gsap.killTweensOf('.skill-card');
    };
  }, [visibleSkills]);

  // Reveal the newly-added cards with a quick pop when "Show More" expands
  // the grid, instead of them just snapping into existence.
  useEffect(() => {
    if (!showAll || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.skill-wrapper');
    const newCards = Array.from(cards).slice(visibleCount);
    if (newCards.length === 0) return;

    gsap.fromTo(
      newCards,
      { opacity: 0, y: 20, scale: 0.85 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04, ease: 'back.out(1.6)' }
    );
  }, [showAll, visibleCount]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 600,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    setHoveredSkill(null);
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 md:py-32 z-30 flex flex-col justify-center"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500" />
            <span className="text-cyan-400 mono text-sm tracking-widest">EXPERTISE</span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-cyan-500" />
          </div>

          <h2 ref={headingRef} className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] mb-4">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto mb-8 px-2">
            A comprehensive toolkit of technologies and frameworks I use to build robust automation solutions.
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 hover:scale-110 active:scale-95 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                    : 'glass text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                data-cursor-hover
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-3 xs:grid-cols-5 gap-3 xs:gap-4 sm:gap-6 lg:gap-7 max-w-5xl mx-auto"
        >
          {visibleSkills.map((skill) => {
            const isHovered = hoveredSkill === skill.name;

            return (
              <div
                key={skill.name}
                className="skill-wrapper relative group"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                data-cursor-hover
              >
                <div className="skill-card h-full w-full">
                  <div
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    className={`relative flex flex-col justify-center min-h-[108px] sm:min-h-[124px] p-4 sm:p-5 glass rounded-2xl transition-all duration-300 cursor-default ${
                      isHovered ? 'scale-105 z-10' : ''
                    }`}
                  style={isHovered ? { boxShadow: `0 0 24px ${skill.color}40, 0 0 48px ${skill.color}15` } : {}}
                >
                  <div className="flex justify-center mb-2.5 sm:mb-3">
                    <SkillIcon
                      svgPath={skill.svgPath}
                      icon={skill.icon}
                      color={skill.color}
                      size={26}
                      isHovered={isHovered}
                    />
                  </div>

                  <p className="text-center text-xs text-white font-medium mb-2 leading-snug">
                    {skill.name}
                  </p>

                  <div className="h-1 bg-slate-700/80 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${skill.level}%`,
                        background: isHovered
                          ? `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`
                          : 'linear-gradient(90deg, #6366f1, #06b6d4)',
                      }}
                    />
                  </div>

                  <div
                    className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, ${skill.color}15, ${skill.color}05)`,
                      opacity: isHovered ? 1 : 0,
                    }}
                  />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll((v) => !v)}
              className="group flex items-center gap-2 px-5 py-2.5 rounded-full glass text-slate-300 hover:text-white hover:bg-white/10 text-sm font-medium transition-all duration-300"
              data-cursor-hover
            >
              {showAll ? 'Show Fewer' : `Show More (${filteredSkills.length - visibleCount})`}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${showAll ? 'rotate-180' : 'group-hover:translate-y-0.5'}`}
              />
            </button>
          </div>
        )}

        <div className="mt-14 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center glass rounded-2xl py-5 px-3">
              <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 mono tracking-wider">
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
