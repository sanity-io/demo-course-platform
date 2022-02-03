import {FiUser, FiGlobe, FiUsers} from 'react-icons/fi'

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
      // default: true,
    },
    {
      name: 'localized',
      title: 'Localized',
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
      type: 'localizedGoogleTranslateString',
      group: 'localized',
      hidden: ({document}) => !document.name,
    },
    {
      name: 'biography',
      title: 'Biography',
      group: 'localized',
      type: 'localizedText',
      hidden: ({document}) => !document.title,
    },
    {
      name: 'photo',
      title: 'Photo',
      group: 'common',
      type: 'image',
      hidden: ({document}) => !document.title,
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
