import { createStore } from "vuex";
import auth from '@/store/modules/auth.module'
import request from '@/store/modules/request.module'
import alert from '@/store/modules/alert.module'
import message from '@/store/modules/message.module'

import type { RootState } from "@/types/types";

const store =  createStore<RootState>({
   modules: {
    auth, 
    request,
    alert,
    message
  }
})
export default store