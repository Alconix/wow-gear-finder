import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import zones from '../../data/sl.js';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 300,
    fixed: 'left',
  },
  {
    title: 'Slot',
    dataIndex: 'slot',
    key: 'slot',
    width: 200,
    fixed: 'left',
  },
  {
    title: 'Stat 1',
    dataIndex: 'stat1',
    key: 'stat1',
    fixed: 'left',
    width: 150,
  },
  {
    title: 'Stat 2',
    dataIndex: 'stat2',
    key: 'stat2',
    width: 500,
  },
  {
    title: 'Zone',
    dataIndex: 'zone',
    key: 'zone',
  },
];

const List = (props) => {
  const { query } = props;

  const [items, setItems] = useState([]);

  useEffect(() => {
    let tmp = [];

    const checkSecondaries = (l1, l2) => {
      if (l1.length > l2.length) return false;
      if (l1.length === 0) return true;
      if (l1.length === 1 && (l1[0] === l2[0] || l1[0] === l2[1])) return true;
      if ((l1[0] === l2[0] && l1[1] === l2[1]) || (l1[0] === l2[1] && l1[1] === l2[0])) return true;
    };

    const checkMain = (l1, l2) => {
      if (l1.length > l2.length) return false;
      if (l1.length === 0) return true;
      for (let stat of l2) {
        if (l1.includes(stat)) return true;
      }
      return false;
    };

    const checkWeapon = (slot) => {
      let matching = [];
      if (query.slots.has('1hand')) {
        matching = [
          ...matching,
          '1hmace',
          '1hsword',
          '1haxe',
          'dagger',
          'wand',
          'fist',
          'warglaive',
        ];
      }
      if (query.slots.has('2hands')) {
        matching = [
          ...matching,
          '2hmace',
          '2hsword',
          '2haxe',
          'bow',
          'gun',
          'crossbow',
          'polearm',
          'staff',
        ];
      }
      if (query.slots.has('otherhand')) {
        matching = [...matching, 'offhand', 'shield'];
      }
      return matching.includes(slot);
    };

    const matchQuery = (item) => {
      let queryArray = Array.from(query.stats);
      const secondaryStats = queryArray.filter((item) => !['agi', 'str', 'int'].includes(item));
      const mainStats = queryArray.filter((item) => ['agi', 'str', 'int'].includes(item));
      let itemStats = [item.mainStat, item.secondStat];
      if (item.slot === 'wrist' && query.slots.has('wrist')) {
        if (query.armorType === item.type) {
          return checkSecondaries(secondaryStats, itemStats);
        }
      }
      if (item.slot === 'hands' && query.slots.has('hands')) {
        if (query.armorType === item.type) {
          return checkSecondaries(secondaryStats, itemStats);
        }
      }
      if (item.slot === 'feet' && query.slots.has('feet')) {
        if (query.armorType === item.type) {
          return checkSecondaries(secondaryStats, itemStats);
        }
      }
      if (item.slot === 'chest' && query.slots.has('chest')) {
        if (query.armorType === item.type) {
          return checkSecondaries(secondaryStats, itemStats);
        }
      }
      if (item.slot === 'shoulder' && query.slots.has('shoulder')) {
        if (query.armorType === item.type) {
          return checkSecondaries(secondaryStats, itemStats);
        }
      }
      if (item.slot === 'head' && query.slots.has('head')) {
        if (query.armorType === item.type) {
          return checkSecondaries(secondaryStats, itemStats);
        }
      }
      if (item.slot === 'waist' && query.slots.has('waist')) {
        if (query.armorType === item.type) {
          return checkSecondaries(secondaryStats, itemStats);
        }
      }
      if (item.slot === 'legs' && query.slots.has('legs')) {
        if (query.armorType === item.type) {
          return checkSecondaries(secondaryStats, itemStats);
        }
      }
      if (item.slot === 'finger' && query.slots.has('finger')) {
        return checkSecondaries(secondaryStats, itemStats);
      }
      if (item.slot === 'back' && query.slots.has('back')) {
        return checkSecondaries(secondaryStats, itemStats);
      }
      if (item.slot === 'trinket' && query.slots.has('trinket')) {
        switch (item.type) {
          case 'str':
            return checkMain(mainStats, ['str']);
          case 'agi':
            return checkMain(mainStats, ['agi']);
          case 'int':
            return checkMain(mainStats, ['int']);
          case 'stragi':
            return checkMain(mainStats, ['str', 'agi']);
          case 'strint':
            return checkMain(mainStats, ['str', 'int']);
          case 'strintagi':
            return checkMain(mainStats, ['str', 'int', 'agi']);
          default:
            return checkSecondaries(secondaryStats, item.type);
        }
      }
      if (
        query.weaponTypes.has(item.slot) &&
        checkWeapon(item.slot) &&
        checkSecondaries(secondaryStats, itemStats)
      ) {
        switch (item.type) {
          case 'str':
            return checkMain(mainStats, ['str']);
          case 'agi':
            return checkMain(mainStats, ['agi']);
          case 'int':
            return checkMain(mainStats, ['int']);
          case 'stragi':
            return checkMain(mainStats, ['str', 'agi']);
          case 'strint':
            return checkMain(mainStats, ['str', 'int']);
          case 'strintagi':
            return checkMain(mainStats, ['str', 'int', 'agi']);
          default:
            return checkSecondaries(secondaryStats, item.type);
        }
      }
    };

    const slotToName = (slot) => {
      switch (slot) {
        case '1hmace':
          return 'One-Handed Mace';
        case '1haxe':
          return 'One-Handed Axe';
        case '1hsword':
          return 'One-Handed Sword';
        case 'dagger':
          return 'Dagger';
        case 'wand':
          return 'Wand';
        case 'shield':
          return 'Shield';
        case 'fist':
          return 'Fist Weapon';
        case 'offhand':
          return 'Held in Off-hand';
        case 'staff':
          return 'Staff';
        case 'polearm':
          return 'Polearm';
        case '2hsword':
          return 'Two-Handed Sword';
        case '2haxe':
          return 'Two-Handed Axe';
        case '2hmace':
          return 'Two-Handed Mace';
        case 'bow':
          return 'Bow';
        case 'gun':
          return 'Gun';
        case 'crossbow':
          return 'Crossbow';
        case 'finger':
          return 'Finger';
        case 'back':
          return 'Back';
        case 'trinket':
          return 'Trinket';
        case 'feet':
          return 'Feet';
        case 'head':
          return 'Head';
        case 'chest':
          return 'Chest';
        case 'shoulder':
          return 'Shoulder';
        case 'wrist':
          return 'Wrist';
        case 'hands':
          return 'Hands';
        case 'waist':
          return 'Waist';
        case 'legs':
          return 'Legs';
        case 'warglaive':
          return 'Warglaive';
        default:
          return 'default';
      }
    };

    const zoneToName = (zone) => {
      switch (zone) {
        case 0:
          return 'Sanguine Depths';
        case 1:
          return 'The Necrotic Wake';
        case 2:
          return 'Plaguefall';
        case 3:
          return 'Mists of Tirna Scithe';
        case 4:
          return 'Halls of Atonement';
        case 5:
          return 'Spires of Ascension';
        case 6:
          return 'Theater of Pain';
        case 7:
          return 'De Other Side';
        case 8:
          return 'Castle Nathria';
        default:
          return null;
      }
    };

    const statToName = (stat) => {
      switch (stat) {
        case 'crit':
          return 'Critical Strike';
        case 'mast':
          return 'Mastery';
        case 'haste':
          return 'Haste';
        case 'vers':
          return 'Versatility';
        default:
          return null;
      }
    };

    const checkZone = (nb) => {
      switch (nb) {
        case 0:
          return query.zones.has('sanguinedepths');
        case 1:
          return query.zones.has('necroticwake');
        case 2:
          return query.zones.has('plaguefall');
        case 3:
          return query.zones.has('mists');
        case 4:
          return query.zones.has('halls');
        case 5:
          return query.zones.has('spire');
        case 6:
          return query.zones.has('theatre');
        case 7:
          return query.zones.has('otherside');
        case 8:
          return query.zones.has('castle');
        default:
          return false;
      }
    };

    let zoneNb = 0;
    for (let zone of zones) {
      if (checkZone(zoneNb)) {
        for (let item of zone) {
          if (matchQuery(item)) {
            const newItem = {
              key: item.name,
              name: <a href={`https://www.wowhead.com/item=${item.itemId}`}>{item.name}</a>,
              slot: slotToName(item.slot),
              stat1: statToName(item.mainStat),
              stat2: statToName(item.secondStat) || item.effect,
              zone: zoneToName(zoneNb),
            };
            tmp = [...tmp, newItem];
          }
        }
      }
      zoneNb++;
    }

    setItems(tmp);
  }, [query]);

  return (
    <div>
      <Table pagination={{ pageSize: 20 }} columns={columns} dataSource={items} />
    </div>
  );
};

export default List;
