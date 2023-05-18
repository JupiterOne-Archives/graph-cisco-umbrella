## [0.3.0] - 2023-04-11

### Added

- Second round of step implementations

  | Resources            | Entity `_type`                        | Entity `_class` |
  | -------------------- | ------------------------------------- | --------------- |
  | Application          | `cisco_umbrella_application`          | `Application`   |
  | Application Category | `cisco_umbrella_application_category` | `Group`         |
  | Network Device       | `cisco_umbrella_network_device`       | `Device`        |
  | System Role          | `cisco_umbrella_role`                 | `AccessRole`    |
  | System User          | `cisco_umbrella_user`                 | `User`          |

  | Source Entity `_type`        | Relationship `_class` | Target Entity `_type`                 |
  | ---------------------------- | --------------------- | ------------------------------------- |
  | `cisco_umbrella_account`     | **HAS**               | `cisco_umbrella_application`          |
  | `cisco_umbrella_account`     | **HAS**               | `cisco_umbrella_network_device`       |
  | `cisco_umbrella_account`     | **HAS**               | `cisco_umbrella_network`              |
  | `cisco_umbrella_account`     | **HAS**               | `cisco_umbrella_user`                 |
  | `cisco_umbrella_application` | **HAS**               | `cisco_umbrella_application_category` |
  | `cisco_umbrella_user`        | **ASSIGNED**          | `cisco_umbrella_role`                 |

## [0.2.0] - 2023-04-10

### Added

- Initial round of step implementations:

  | Resources         | Entity `_type`                     | Entity `_class`   |
  | ----------------- | ---------------------------------- | ----------------- |
  | Account           | `cisco_umbrella_account`           | `Account`         |
  | Destination       | `cisco_umbrella_destination`       | `Record`          |
  | Destination List  | `cisco_umbrella_destination_list`  | `Record`          |
  | Domain            | `cisco_umbrella_domain`            | `Domain`          |
  | Network           | `cisco_umbrella_network`           | `Network`         |
  | Network Tunnel    | `cisco_umbrella_network_tunnel`    | `NetworkEndpoint` |
  | Policy            | `cisco_umbrella_policy`            | `Policy`          |
  | Site              | `cisco_umbrella_site`              | `Site`            |
  | Virtual Appliance | `cisco_umbrella_virtual_appliance` | `Gateway`         |

  | Source Entity `_type`              | Relationship `_class` | Target Entity `_type`              |
  | ---------------------------------- | --------------------- | ---------------------------------- |
  | `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_destination_list`  |
  | `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_domain`            |
  | `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_network`           |
  | `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_policy`            |
  | `cisco_umbrella_account`           | **HAS**               | `cisco_umbrella_site`              |
  | `cisco_umbrella_destination_list`  | **HAS**               | `cisco_umbrella_destination`       |
  | `cisco_umbrella_site`              | **HAS**               | `cisco_umbrella_network_tunnel`    |
  | `cisco_umbrella_site`              | **HAS**               | `cisco_umbrella_virtual_appliance` |
  | `cisco_umbrella_virtual_appliance` | **USES**              | `cisco_umbrella_domain`            |

## [0.1.0] - 2023-03-28

### Added

- Initial implementation of API client with working authentication and token
  refresh.
