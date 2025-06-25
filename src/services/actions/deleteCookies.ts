'use server';

import { cookies } from 'next/headers';

export const deleteCookies = async (keys: string[]) => {
    const cookiesStore = await cookies();
   keys.forEach((key) => {
      cookiesStore.delete(key);
   });
};
