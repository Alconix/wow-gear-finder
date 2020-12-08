import React, { useState, useEffect } from "react";
import { Typography, Button, Row, Col } from "antd";

const { Title } = Typography;

const Sidebar = (props) => {
  const [query, setQuery] = useState(props.urlQuery);

  useEffect(() => {
    setQuery(props.urlQuery);
  }, [props]);

  const [selectedClass, setClass] = useState("");

  const { sendQuery } = props;

  const toggleZone = (zone) => {
    const newZones = query.zones;
    let newQuery = null;
    if (query.zones.has(zone)) {
      newZones.delete(zone);
      newQuery = { ...query, zones: newZones };
    } else {
      newZones.add(zone);
      newQuery = { ...query, zones: newZones };
    }
    setQuery(newQuery);
    sendQuery(newQuery);
  };

  const toggleSlot = (slot) => {
    const newSlots = query.slots;
    let newQuery = null;
    if (query.slots.has(slot)) {
      newSlots.delete(slot);
      newQuery = { ...query, slots: newSlots };
    } else {
      newSlots.add(slot);
      newQuery = { ...query, slots: newSlots };
    }
    setQuery(newQuery);
    sendQuery(newQuery);
  };

  const toggleStat = (stat) => {
    const newStats = query.stats;
    let newQuery = null;
    if (query.stats.has(stat)) {
      newStats.delete(stat);
      newQuery = { ...query, stats: newStats };
    } else {
      newStats.add(stat);
      newQuery = { ...query, stats: newStats };
    }
    setQuery(newQuery);
    sendQuery(newQuery);
  };

  const selectClass = (newClass) => {
    let newQuery = null;
    if (newClass === selectedClass) {
      setClass("");
      const newStats = query.stats;
      const newSlots = query.slots;
      ["agi", "str", "int"].forEach((stat) => newStats.delete(stat));
      ["2hands", "1hand", "otherhand"].forEach((slot) => newSlots.delete(slot));
      newQuery = {
        ...query,
        weaponTypes: new Set(),
        armorType: "",
        selected: "",
      };
      setQuery(newQuery);
      sendQuery(newQuery);
      return;
    }
    setClass(newClass);
    const newStats = query.stats;
    const newSlots = query.slots;
    switch (newClass) {
      case "dk":
        newStats.delete("int");
        newStats.delete("agi");
        newStats.add("str");
        newQuery = {
          ...query,
          stats: newStats,
          armorType: "plate",
          weaponTypes: new Set([
            "2hsword",
            "1hsword",
            "1hmace",
            "2hmace",
            "1haxe",
            "2haxe",
            "polearm",
          ]),
          selected: "dk",
        };
        break;
      case "dh":
        newStats.delete("int");
        newStats.delete("str");
        newSlots.delete("2hands");
        newStats.add("agi");
        newQuery = {
          ...query,
          stats: newStats,
          slots: newSlots,
          armorType: "leather",
          weaponTypes: new Set(["warglaive", "fist", "1haxe", "1hsword"]),
          selected: "dh",
        };
        break;
      case "druid":
        newStats.delete("str");
        newQuery = {
          ...query,
          stats: newStats,
          armorType: "leather",
          weaponTypes: new Set([
            "1hmace",
            "2hmace",
            "polearm",
            "staff",
            "dagger",
            "fist",
            "offhand",
          ]),
          selected: "druid",
        };
        break;
      case "hunt":
        newStats.delete("int");
        newStats.delete("str");
        newSlots.delete("1hand");
        newSlots.delete("otherhand");
        newStats.add("agi");
        newQuery = {
          ...query,
          stats: newStats,
          slots: newSlots,
          armorType: "mail",
          weaponTypes: new Set(["polearm", "staff", "bow", "gun", "crossbow"]),
          selected: "hunt",
        };
        break;
      case "mage":
        newStats.delete("agi");
        newStats.delete("str");
        newStats.add("int");
        newQuery = {
          ...query,
          stats: newStats,
          armorType: "cloth",
          weaponTypes: new Set([
            "staff",
            "dagger",
            "wand",
            "1hsword",
            "offhand",
          ]),
          selected: "mage",
        };
        break;
      case "monk":
        newStats.delete("str");
        newQuery = {
          ...query,
          stats: newStats,
          armorType: "leather",
          weaponTypes: new Set([
            "1haxe",
            "1hsword",
            "1hmace",
            "polearm",
            "staff",
            "fist",
            "offhand",
          ]),
          selected: "monk",
        };
        break;
      case "pal":
        newStats.delete("agi");
        newQuery = {
          ...query,
          stats: newStats,
          armorType: "plate",
          weaponTypes: new Set([
            "1haxe",
            "2haxe",
            "1hsword",
            "2hsword",
            "1hmace",
            "2hmace",
            "polearm",
            "shield",
          ]),
          selected: "pal",
        };
        break;
      case "priest":
        newStats.delete("str");
        newStats.delete("agi");
        newStats.add("int");
        newQuery = {
          ...query,
          armorType: "cloth",
          stats: newStats,
          weaponTypes: new Set([
            "1hmace",
            "staff",
            "dagger",
            "wand",
            "offhand",
          ]),
          selected: "priest",
        };
        break;
      case "rogue":
        newStats.delete("str");
        newStats.delete("int");
        newSlots.delete("2hands");
        newStats.add("agi");
        newQuery = {
          ...query,
          stats: newStats,
          slots: newSlots,
          armorType: "leather",
          weaponTypes: new Set([
            "1haxe",
            "1hsword",
            "1hmace",
            "dagger",
            "fist",
          ]),
          selected: "rogue",
        };
        break;
      case "sham":
        newStats.delete("str");
        newQuery = {
          ...query,
          stats: newStats,
          armorType: "mail",
          weaponTypes: new Set([
            "staff",
            "1haxe",
            "1hmace",
            "dagger",
            "fist",
            "shield",
            "offhand",
          ]),
          selected: "sham",
        };
        break;
      case "lock":
        newStats.delete("str");
        newStats.delete("agi");
        newStats.add("int");
        newQuery = {
          ...query,
          stats: newStats,
          armorType: "cloth",
          weaponTypes: new Set([
            "1hsword",
            "staff",
            "dagger",
            "wand",
            "offhand",
          ]),
          selected: "lock",
        };
        break;
      case "war":
        newStats.delete("agi");
        newStats.delete("int");
        newStats.add("str");
        newQuery = {
          ...query,
          stats: newStats,
          armorType: "plate",
          weaponTypes: new Set([
            "1hsword",
            "1haxe",
            "1hmace",
            "shield",
            "2hsword",
            "2haxe",
            "2hmace",
          ]),
          selected: "war",
        };
        break;
      default:
        break;
    }
    setQuery(newQuery);
    sendQuery(newQuery);
  };

  const classSelection = (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.selected === "dk" ? "primary" : "secondary"}
            onClick={() => selectClass("dk")}
            size={"large"}
            block
          >
            Death Knight
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.selected === "dh" ? "primary" : "secondary"}
            onClick={() => selectClass("dh")}
            size={"large"}
            block
          >
            Demon Hunter
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.selected === "druid" ? "primary" : "secondary"}
            onClick={() => selectClass("druid")}
            size={"large"}
            block
            margin={5}
          >
            Druid
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.selected === "hunt" ? "primary" : "secondary"}
            onClick={() => selectClass("hunt")}
            size={"large"}
            block
          >
            Hunter
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.selected === "mage" ? "primary" : "secondary"}
            onClick={() => selectClass("mage")}
            size={"large"}
            block
          >
            Mage
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.selected === "monk" ? "primary" : "secondary"}
            onClick={() => selectClass("monk")}
            size={"large"}
            block
          >
            Monk
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.selected === "pal" ? "primary" : "secondary"}
            onClick={() => selectClass("pal")}
            size={"large"}
            block
          >
            Paladin
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.selected === "priest" ? "primary" : "secondary"}
            onClick={() => selectClass("priest")}
            size={"large"}
            block
          >
            Priest
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.selected === "rogue" ? "primary" : "secondary"}
            onClick={() => selectClass("rogue")}
            size={"large"}
            block
          >
            Rogue
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.selected === "sham" ? "primary" : "secondary"}
            onClick={() => selectClass("sham")}
            size={"large"}
            block
          >
            Shaman
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.selected === "lock" ? "primary" : "secondary"}
            onClick={() => selectClass("lock")}
            size={"large"}
            block
          >
            Warlock
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.selected === "war" ? "primary" : "secondary"}
            onClick={() => selectClass("war")}
            size={"large"}
            block
          >
            Warrior
          </Button>
        </Col>
      </Row>
    </>
  );

  const noAgi =
    query.selected === "war" ||
    query.selected === "dk" ||
    query.selected === "mage" ||
    query.selected === "lock" ||
    query.selected === "pal" ||
    query.selected === "priest";

  const noStr =
    query.selected === "dh" ||
    query.selected === "druid" ||
    query.selected === "mage" ||
    query.selected === "hunt" ||
    query.selected === "monk" ||
    query.selected === "priest" ||
    query.selected === "rogue" ||
    query.selected === "sham" ||
    query.selected === "lock";

  const noInt =
    query.selected === "dk" ||
    query.selected === "dh" ||
    query.selected === "hunt" ||
    query.selected === "rogue" ||
    query.selected === "war";

  const statsSelection = (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            disabled={noAgi}
            type={query.stats.has("agi") ? "primary" : "secondary"}
            onClick={() => {
              toggleStat("agi");
            }}
            size={"large"}
            block
          >
            Agility
          </Button>
        </Col>
        <Col span={12}>
          <Button
            disabled={noStr}
            type={query.stats.has("str") ? "primary" : "secondary"}
            onClick={() => {
              toggleStat("str");
            }}
            size={"large"}
            block
          >
            Strength
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            disabled={noInt}
            type={query.stats.has("int") ? "primary" : "secondary"}
            onClick={() => {
              toggleStat("int");
            }}
            size={"large"}
            block
            margin={5}
          >
            Intellect
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.stats.has("crit") ? "primary" : "secondary"}
            onClick={() => {
              toggleStat("crit");
            }}
            size={"large"}
            block
          >
            Critical Strike
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.stats.has("vers") ? "primary" : "secondary"}
            onClick={() => {
              toggleStat("vers");
            }}
            size={"large"}
            block
          >
            Versatility
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.stats.has("mast") ? "primary" : "secondary"}
            onClick={() => {
              toggleStat("mast");
            }}
            size={"large"}
            block
          >
            Mastery
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.stats.has("haste") ? "primary" : "secondary"}
            onClick={() => {
              toggleStat("haste");
            }}
            size={"large"}
            block
          >
            Haste
          </Button>
        </Col>
      </Row>
    </>
  );

  const slotSelection = (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.slots.has("wrist") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("wrist");
            }}
            size={"large"}
            block
          >
            Wrist
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.slots.has("hands") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("hands");
            }}
            size={"large"}
            block
          >
            Hands
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.slots.has("waist") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("waist");
            }}
            size={"large"}
            block
            margin={5}
          >
            Waist
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.slots.has("legs") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("legs");
            }}
            size={"large"}
            block
          >
            Legs
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.slots.has("chest") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("chest");
            }}
            size={"large"}
            block
          >
            Chest
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.slots.has("shoulder") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("shoulder");
            }}
            size={"large"}
            block
          >
            Shoulder
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.slots.has("head") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("head");
            }}
            size={"large"}
            block
          >
            Head
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.slots.has("back") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("back");
            }}
            size={"large"}
            block
          >
            Back
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.slots.has("feet") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("feet");
            }}
            size={"large"}
            block
          >
            Feet
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.slots.has("finger") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("finger");
            }}
            size={"large"}
            block
          >
            Finger
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.slots.has("trinket") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("trinket");
            }}
            size={"large"}
            block
          >
            Trinket
          </Button>
        </Col>
        <Col span={12}>
          <Button
            disabled={selectedClass === "rogue" || selectedClass === "dh"}
            type={query.slots.has("2hands") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("2hands");
            }}
            size={"large"}
            block
          >
            Two Hands
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            disabled={selectedClass === "hunt"}
            type={query.slots.has("1hand") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("1hand");
            }}
            size={"large"}
            block
          >
            One Hand
          </Button>
        </Col>
        <Col span={12}>
          <Button
            disabled={selectedClass === "hunt"}
            type={query.slots.has("otherhand") ? "primary" : "secondary"}
            onClick={() => {
              toggleSlot("otherhand");
            }}
            size={"large"}
            block
          >
            Other Hand
          </Button>
        </Col>
      </Row>
    </>
  );

  const zoneSelection = (
    <>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.zones.has("necroticwake") ? "primary" : "secondary"}
            onClick={() => {
              toggleZone("necroticwake");
            }}
            size={"large"}
            block
          >
            The Necrotic Wake
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.zones.has("plaguefall") ? "primary" : "secondary"}
            onClick={() => {
              toggleZone("plaguefall");
            }}
            size={"large"}
            block
          >
            Plaguefall
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.zones.has("mists") ? "primary" : "secondary"}
            onClick={() => {
              toggleZone("mists");
            }}
            size={"large"}
            block
            margin={5}
          >
            Mists of Tirna Scithe
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.zones.has("halls") ? "primary" : "secondary"}
            onClick={() => {
              toggleZone("halls");
            }}
            size={"large"}
            block
          >
            Halls of Atonement
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.zones.has("spire") ? "primary" : "secondary"}
            onClick={() => {
              toggleZone("spire");
            }}
            size={"large"}
            block
          >
            Spires of Ascension
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.zones.has("theatre") ? "primary" : "secondary"}
            onClick={() => {
              toggleZone("theatre");
            }}
            size={"large"}
            block
          >
            Theater of Pain
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.zones.has("otherside") ? "primary" : "secondary"}
            onClick={() => {
              toggleZone("otherside");
            }}
            size={"large"}
            block
          >
            De Other Side
          </Button>
        </Col>
        <Col span={12}>
          <Button
            type={query.zones.has("sanguinedepths") ? "primary" : "secondary"}
            onClick={() => {
              toggleZone("sanguinedepths");
            }}
            size={"large"}
            block
          >
            Sanguine Depths
          </Button>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Button
            type={query.zones.has("castle") ? "primary" : "secondary"}
            onClick={() => {
              toggleZone("castle");
            }}
            size={"large"}
            block
          >
            Castle Nathria
          </Button>
        </Col>
      </Row>
    </>
  );

  const selectAllZones = () => {
    const newZones = query.zones;
    let newQuery = null;
    [
      "sanguinedepths",
      "necroticwake",
      "plaguefall",
      "mists",
      "halls",
      "spire",
      "spire",
      "theatre",
      "otherside",
      "castle",
    ].forEach((zone) => newZones.add(zone));
    newQuery = { ...query, zones: newZones };
    setQuery(newQuery);
    sendQuery(newQuery);
  };

  const selectAllSlots = () => {
    const newSlots = query.slots;
    let newQuery = null;
    const slots = [
      "wrist",
      "hands",
      "waist",
      "legs",
      "feet",
      "finger",
      "trinket",
      "chest",
      "shoulder",
      "back",
      "head",
    ];
    if (selectedClass !== "rogue" && selectedClass !== "dh")
      slots.push("2hands");
    if (selectedClass !== "hunt") slots.push("1hand", "otherhand");
    slots.forEach((slot) => newSlots.add(slot));
    newQuery = { ...query, slots: newSlots };
    setQuery(newQuery);
    sendQuery(newQuery);
  };

  return (
    <div style={{ margin: "1rem" }}>
      <Title level={2}>Class Selection</Title>
      {classSelection}
      <Title level={2}>Stats Selection</Title>
      {statsSelection}
      <span style={{ display: "flex", alignItems: "center" }}>
        <Title level={2}>Slot Selection</Title>
        <Button
          type='link'
          onClick={() => {
            selectAllSlots();
          }}
        >
          Select all
        </Button>
      </span>
      {slotSelection}
      <span style={{ display: "flex", alignItems: "center" }}>
        <Title level={2}>Zone Selection</Title>
        <Button
          type='link'
          onClick={() => {
            selectAllZones();
          }}
        >
          Select all
        </Button>
      </span>
      {zoneSelection}
    </div>
  );
};

export default Sidebar;
