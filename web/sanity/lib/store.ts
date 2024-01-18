import * as queryStore from '@sanity/react-loader'

import {client} from '@/sanity/lib/client'
import {token} from '@/sanity/lib/token'

queryStore.setServerClient(client.withConfig({token}))

export const {loadQuery} = queryStore
