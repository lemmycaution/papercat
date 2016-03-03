'use strict';

import riot from 'riot';
import api from './api';
import './tags.js';
riot.mount('body','pc-app', {api});