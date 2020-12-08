import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import 'antd/dist/antd.css';

import Sidebar from '../sidebar';
import List from '../list';

const { Sider, Content } = Layout;

const AppLayout = () => {
  const [query, setQuery] = useState({
    slots: new Set(),
    stats: new Set(),
    zones: new Set(),
    armorType: '',
    weaponTypes: new Set(),
    selected: '',
  });

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    let newQuery = {};

    const newSlots = params.getAll('slot');
    if (newSlots) {
      newQuery = { ...newQuery, slots: new Set(newSlots) };
    }

    const newStats = params.getAll('stat');
    if (newStats) {
      newQuery = { ...newQuery, stats: new Set(newStats) };
    }

    const newZones = params.getAll('zone');
    if (newZones) {
      newQuery = { ...newQuery, zones: new Set(newZones) };
    }

    const armor = params.get('armor');
    if (armor) {
      newQuery = { ...newQuery, armorType: armor };
    }

    const newWeapons = params.getAll('weapon');
    if (newWeapons) {
      newQuery = { ...newQuery, weaponTypes: new Set(newWeapons) };
    }

    const newSelected = params.get('selected');
    if (newSelected) {
      newQuery = { ...newQuery, selected: newSelected };
    }

    if (JSON.stringify(newQuery) !== JSON.stringify(query)) {
      setQuery(newQuery);
    }
  }, [setQuery, location.search, query]);

  const setParams = (newQuery) => {
    let params = new URLSearchParams();
    setQuery(newQuery);

    for (let z of newQuery.zones) {
      params.append('zone', z);
    }
    for (let s of newQuery.slots) {
      params.append('slot', s);
    }
    for (let s of newQuery.stats) {
      params.append('stat', s);
    }
    for (let w of newQuery.weaponTypes) {
      params.append('weapon', w);
    }
    if (newQuery.armorType) {
      params.append('armor', newQuery.armorType);
    }
    if (newQuery.selected) {
      params.append('selected', newQuery.selected);
    }

    history.push({
      pathname: '/',
      search: '?' + params.toString(),
    });
  };

  return (
    <div className='App'>
      <Layout style={{ display: 'flex' }}>
        <Sider width={400} theme={'light'} style={{ flex: 1 }}>
          <Sidebar sendQuery={setParams} urlQuery={query} />
        </Sider>
        <Layout>
          <Content style={{ margin: '24px 16px 0', flex: 1 }}>
            <List query={query} />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default AppLayout;
