import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Reports', timestamps: false })
export class Report extends Model<Report> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  serviceName: string;

  @Column({ type: DataType.STRING })
  endpoint: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  headers: string[];

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.STRING })
  fileUrl: string;
}
