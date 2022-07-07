import React from 'react';
import { Secp256k1KeyIdentity } from '@dfinity/identity';
import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';
import fetch from 'cross-fetch';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar, ToastHandler, Alerts } from './components';
import CollectionView from './views/CollectionView';
import NFTView from './views/NFTView';
import OfferView from './views/OffersView';
import UserActivityView from './views/UserActivityView';
import { useTheme } from './hooks/use-theme';
import { portalZIndexGlobals } from './utils/styles';
import { ThemeRootElement } from './constants/common';
import { useThemeGlobals } from './hooks';
import capRootIdlFactory from './declarations/cap-root.did';

const App = () => {
  const [theme, themeObject] = useTheme();

  (async () => {
    console.log('[debug] debugging: start');

    const identity = Secp256k1KeyIdentity.generate();
    const host = 'https://mainnet.dfinity.network';
    const agent = new HttpAgent({ host, fetch, identity });
    const capRootCanisterId = 'bqswi-zaaaa-aaaah-abkza-cai';
    const plugPrincipal =
      '6vj5p-imd5n-7gtwg-fskuc-bvuqy-65j54-xxdqw-gxikv-rkw4u-ocrmb-dqe';

    const actorMkp = Actor.createActor(capRootIdlFactory, {
      canisterId: capRootCanisterId,
      agent,
    });

    const result = await actorMkp.get_user_transactions({
      page: (() => [0])(),
      user: Principal.fromText(plugPrincipal),
      witness: false,
    });

    console.log('[debug] ->>>>', result);
    console.log('[debug] debugging: end!');
  })();

  useThemeGlobals(theme);
  portalZIndexGlobals();

  return (
    <div className={themeObject} id={ThemeRootElement}>
      <BrowserRouter>
        <Alerts />
        <NavBar />
        <Routes>
          <Route path="/" element={<CollectionView />}>
            <Route path="/activity" />
          </Route>
          <Route path="/nft/:id" element={<NFTView />} />
          <Route path="/offers/:id" element={<OfferView />} />
          <Route
            path="/activity/:id"
            element={<UserActivityView />}
          />
        </Routes>
      </BrowserRouter>
      <ToastHandler />
    </div>
  );
};

export default App;
