import {FiUser, FiGlobe, FiUsers} from 'react-icons/fi'

import {i18n} from '../../../../languages'

export default {
  name: 'presenter',
  title: 'Presenter',
  icon: FiUser,
  type: 'document',
  groups: [
    {
      name: 'common',
      title: 'Common',
      icon: FiUsers,
      default: true,
    },
    {
      name: 'i18n',
      title: 'Localised',
      icon: FiGlobe,
    },
  ],
  fields: [
    {
      name: 'name',
      title: 'Name',
      group: 'common',
      type: 'string',
    },
    {
      name: 'title',
      type: 'googleTranslateString',
    },
    {
      name: 'biography',
      title: 'Biography',
      group: 'i18n',
      type: 'localizedText',
    },
    {
      name: 'photo',
      title: 'Photo',
      group: 'common',
      type: 'image',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'title.en_US',
      media: 'photo',
    },
  },
}
