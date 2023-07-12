import React, {useEffect, useState} from 'react'
import { auth } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import { Fragment } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon, PlusIcon, DocumentIcon } from '@heroicons/react/24/outline'


  const navigation = [
    { name: 'Dashboard', href: '/dashboard', current: true },
    { name: 'Calendar', href: '/calendar', current: false },
    // { name: 'Team', href: '#', current: false },
    // { name: 'Projects', href: '#', current: false },
  ]
  const userNavigation = [
    // { name: 'Your Profile', href: '#' },
    // { name: 'Settings', href: '#' },
    { name: 'Sign out', onclick: () => { localStorage.removeItem('rememberMe');
    auth.signOut();}},
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
          } else {
            setUser(null);
            navigate('/');
          }
        });
    
        return () => {
          unsubscribe();
        };
      }, [navigate]);

    if (!user) {
        return null;
        } else {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100" />         
  )
}
}