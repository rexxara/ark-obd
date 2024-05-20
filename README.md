# how to run
npm run build&&npx cap sync&&npx cap run android

## Available commands
ObdMultiCommand 用这个执行多个command
SpeedCommand 获取速度

### 温度
AirIntakeTemperatureCommand 进气温度
AmbientAirTemperatureCommand 环境空气温度
EngineCoolantTemperatureCommand 发动机冷却液温度

### 压力
BarometricPressureCommand 大气压力
FuelPressureCommand 燃油压力
FuelRailPressureCommand 燃油分供管压力
Intake Manifold Pressure 进气歧管压力
### 燃料
AirFuelRatioCommand 空燃比
ConsumptionRateCommand 每小时燃油消耗率
FindFuelTypeCommand 动力类型
FuelLevelCommand 燃料等级
FuelTrimCommand 燃油调节
WidebandAirFuelRatioCommand 宽带空燃比
### 引擎
AbsoluteLoadCommand 绝对负载
LoadCommand 负载
MassAirFlowCommand 空气质量流量
OilTempCommand 发动机机油温度
RPMCommand 发动机转速
RuntimeCommand 发动机运行时
ThrottlePositionCommand 读取节气门位置的百分比
### 控制
DistanceMILOnCommand 距离
DistanceSinceCCCommand 清零之后距离
DtcNumberCommand 诊断错误码数量
EquivalentRatioCommand 燃烧当量比
IgnitionMonitorCommand 点火监视器
ModuleVoltageCommand 模块电压
PendingTroubleCodesCommand 未决故障代码
PermanentTroubleCodesCommand 永久故障代码
TimingAdvanceCommand 喷油泵正时器
TroubleCodesCommand 故障代码命令
VinCommand 车辆识别代号
### 协议
ObdResetCommand 重置obd连接


    AIR_INTAKE_TEMP("Air Intake Temperature"),
    AMBIENT_AIR_TEMP("Ambient Air Temperature"),
    ENGINE_COOLANT_TEMP("Engine Coolant Temperature"),
    BAROMETRIC_PRESSURE("Barometric Pressure"),
    FUEL_PRESSURE("Fuel Pressure"),
    INTAKE_MANIFOLD_PRESSURE("Intake Manifold Pressure"),
    ENGINE_LOAD("Engine Load"),
    ENGINE_RUNTIME("Engine Runtime"),
    ENGINE_RPM("Engine RPM"),
    SPEED("Vehicle Speed"),
    MAF("Mass Air Flow"),
    THROTTLE_POS("Throttle Position"),
    TROUBLE_CODES("Trouble Codes"),
    PENDING_TROUBLE_CODES("Pending Trouble Codes"),
    PERMANENT_TROUBLE_CODES("Permanent Trouble Codes"),
    FUEL_LEVEL("Fuel Level"),
    FUEL_TYPE("Fuel Type"),
    FUEL_CONSUMPTION_RATE("Fuel Consumption Rate"),
    TIMING_ADVANCE("Timing Advance"),
    DTC_NUMBER("Diagnostic Trouble Codes"),
    EQUIV_RATIO("Command Equivalence Ratio"),
    DISTANCE_TRAVELED_AFTER_CODES_CLEARED("Distance since codes cleared"),
    CONTROL_MODULE_VOLTAGE("Control Module Power Supply "),
    ENGINE_FUEL_RATE("Engine Fuel Rate"),
    FUEL_RAIL_PRESSURE("Fuel Rail Pressure"),
    VIN("Vehicle Identification Number (VIN)"),
    DISTANCE_TRAVELED_MIL_ON("Distance traveled with MIL on"),
    TIME_TRAVELED_MIL_ON("Time run with MIL on"),
    TIME_SINCE_TC_CLEARED("Time since trouble codes cleared"),
    REL_THROTTLE_POS("Relative throttle position"),
    PIDS_01_20("Available PIDs 01-20"),
    PIDS_21_40("Available PIDs 21-40"),
    PIDS_41_60("Available PIDs 41-60"),
    ABS_LOAD("Absolute load"),
    ENGINE_OIL_TEMP("Engine oil temperature"),
    AIR_FUEL_RATIO("Air/Fuel Ratio"),
    WIDEBAND_AIR_FUEL_RATIO("Wideband Air/Fuel Ratio"),
    DESCRIBE_PROTOCOL("Describe protocol"),
    DESCRIBE_PROTOCOL_NUMBER("Describe protocol number"),
    IGNITION_MONITOR("Ignition monitor")