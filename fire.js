import * as firebase from 'firebase'
import firestore from 'firebase/firestore'

import { config } from './secrets'

firebase.initializeApp(config)

export const fs = firebase.firestore()
