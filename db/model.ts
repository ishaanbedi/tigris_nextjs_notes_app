import {
  Field,
  PrimaryKey,
  SearchField,
  TigrisCollection,
  TigrisDataTypes,
} from "@tigrisdata/core";
@TigrisCollection("notes")
export class Note {
  @PrimaryKey(TigrisDataTypes.INT32, { order: 1, autoGenerate: true })
  id!: number;
  @SearchField()
  @Field()
  title!: string;
  @Field()
  body!: string;
}
