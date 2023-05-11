#![cfg_attr(not(feature = "std"), no_std)]

#[ink::contract]
mod store_traffic {
    use ink::storage::Mapping;

    /// 乘客付款时，将发射该付款事件
    #[ink(event)]
    pub struct PayEvent {
        vehicle_id: AccountId,
    }

    /// 乘客上车时，将发射该登车事件
    #[ink(event)]
    pub struct BoardEvent {
        vehicle_id: AccountId,
    }

    /// 路径规划的结果存入区块链时，会触发该路径规划完成事件
    #[ink(event)]
    pub struct RouteEvent {
        passenger_id: AccountId,
    }

    /// 乘客修改车辆状态时触发？
    #[ink(event)]
    pub struct DispatchEvent {
        passenger_id: AccountId,
        vehicle_id: AccountId,
        passenger_geohash: String,
    }

    /// 记录一条从起点开向终点的路径
    /// 这里的derive和cfg_attr可以在[ink!文档](https://use.ink/datastructures/custom-datastructure/)找到
    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct NavigationRoute {
        route_coordinates: Vec<String>,
        route_cost: u128,
    }

    /// 记录车辆的信息
    #[derive(scale::Decode, scale::Encode)]
    #[cfg_attr(
        feature = "std",
        derive(scale_info::TypeInfo, ink::storage::traits::StorageLayout)
    )]
    pub struct Vehicle {
        id: AccountId,
        geohash: String,
        is_empty: bool,
    }

    /// 合约状态记录于此
    #[ink(storage)]
    pub struct StoreTraffic {
        routes: Mapping<AccountId, NavigationRoute>,
        vehicles: Mapping<AccountId, Vehicle>,
    }

    impl StoreTraffic {
        /// 默认构造函数
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                routes: Mapping::new(),
                vehicles: Mapping::new(),
            }
        }

        /// 发射付款事件
        #[ink(message)]
        pub fn confirm_pay(&self, vehicle_id: AccountId) {
            Self::env().emit_event(PayEvent { vehicle_id });
        }

        /// 发射登车事件
        #[ink(message)]
        pub fn confirm_board(&self, vehicle_id: AccountId) {
            Self::env().emit_event(BoardEvent { vehicle_id })
        }

        /// 记录为司乘规划的路线
        #[ink(message)]
        pub fn store_routes(
            &mut self,
            cost: u128,
            vehicle_id: AccountId,
            passenger_id: AccountId,
            routes: Vec<String>,
        ) {
            self.routes.insert(
                vehicle_id,
                &NavigationRoute {
                    route_coordinates: routes,
                    route_cost: cost,
                },
            );

            Self::env().emit_event(RouteEvent { passenger_id });
        }

        /// 获取为司机规划的路线
        #[ink(message)]
        pub fn get_routes(&self, vehicle_id: AccountId) -> NavigationRoute {
            self.routes.get(vehicle_id).unwrap_or(NavigationRoute {
                route_coordinates: vec![],
                route_cost: 0,
            })
        }

        /// 初始化车辆
        #[ink(message)]
        pub fn add_vehicle(&mut self, vehicle_id: AccountId, geohash: String) {
            self.vehicles.insert(
                vehicle_id,
                &Vehicle {
                    id: vehicle_id,
                    geohash,
                    is_empty: true,
                },
            );
        }

        // TODO: getVehicle

        /// 查询车辆是否为空车
        #[ink(message)]
        pub fn is_vehicle_empty(&self, vehicle_id: AccountId) -> bool {
            if let Some(content) = self.vehicles.get(&vehicle_id) {
                content.is_empty
            } else {
                // 若车辆不存在也认为非空，省得出现奇形怪状的事情
                false
            }
        }

        /// 将一辆车分配给乘客
        #[ink(message)]
        pub fn dispatch_vehicle_to_passenger(
            &mut self,
            vehicle_id: AccountId,
            passenger_id: AccountId,
            passenger_geohash: String,
        ) {
            if let Some(vehicle) = self.vehicles.get(vehicle_id).as_mut() {
                if vehicle.is_empty {
                    Self::env().emit_event(DispatchEvent {
                        passenger_id,
                        vehicle_id,
                        passenger_geohash,
                    });
                    vehicle.is_empty = false;
                }
            }
        }

        /// 释放车辆占用，变为空车
        #[ink(message)]
        pub fn release_vehicle(&mut self, vehicle_id: AccountId) {
            if let Some(vehicle) = self.vehicles.get(vehicle_id).as_mut() {
                vehicle.is_empty = true;
            }
        }

        // TODO: getVehicle没写，原合约160行之后的内容还没翻译
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// We test a simple use case of our contract.
        #[ink::test]
        fn it_works() {}
    }
}
