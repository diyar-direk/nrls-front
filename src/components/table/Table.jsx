import { memo, useCallback, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import "./table.css";
import Paginations from "./Paginations";
import CloumnsVisible from "./CloumnsVisible";
import TableLoading from "./TableLoading";
import TabelError from "./TabelError";
import TableNoResults from "./TableNoResults";
import SelectOptionInput from "../inputs/SelectOptionInput";
import { useDashboardContext } from "../../context/DashboardContext";

/**
 * @typedef TableProps
 * @property {Array<object>} colmuns أعمدة الجدول
 * @property {boolean} selectable هل يمكن تحديد الصفوف
 * @property {object} addBtnProps
 * @property {boolean} loading حالة التحميل
 * @property {boolean} hideLimitSelection
 * @property {number} currentPage رقم الصفحة الحالية
 * @property {(page: number) => void} setPage دالة لتغيير الصفحة
 * @property {Array<object>} data بيانات الجدول
 * @property {string} error رسالة الخطأ للعرض
 * @property {()=>void} onRefetch  فنكشن لاعادة طلب البيانات في حال وجود خطأ
 * @property {number} dataLength عدد البيانات الكلي (لأجل الـ Pagination)
 * @property {(sort: any) => void} setSort دالة لتحديد الفرز
 * @property {Set<string|number>} selectedItems العناصر المحددة
 * @property {(items: Set<string|number>) => void} setSelectedItems دالة لتغيير العناصر المحددة
 */
/**
 * @param {TableProps} props
 */

const Table = ({
  colmuns,
  selectable,
  loading,
  currentPage,
  setPage,
  data,
  dataLength,
  setSort,
  selectedItems,
  setSelectedItems,
  error,
  onRefetch,
  addBtnProps,
  notSelectIf = () => {},
  hideLimitSelection,
  sortBy,
}) => {
  const [columnsState, setColumnsState] = useState(colmuns || []);
  const { setLimit, page_size } = useDashboardContext();

  const onLimitChanging = useCallback(
    (value) => {
      setLimit(value);
      setPage(1);
    },
    [setLimit, setPage],
  );

  if (loading) return <TableLoading />;

  if (error) return <TabelError error={error} onRefetch={onRefetch} />;

  if (!data || data?.length === 0) return <TableNoResults {...addBtnProps} />;

  return (
    <>
      <div className="table-header">
        <article>
          {!hideLimitSelection && (
            <SelectOptionInput
              wrapperProps={{ className: "limit" }}
              placeholder={page_size}
              options={[
                { text: 10, value: 10 },
                { text: 15, value: 15 },
                { text: 20, value: 20 },
              ]}
              onSelectOption={(e) => onLimitChanging(e.value)}
            />
          )}
          <CloumnsVisible
            columns={columnsState}
            setColumns={setColumnsState}
            defaultColumns={colmuns}
            onRefetch={onRefetch}
          />
        </article>

        <div className="table">
          <table>
            <TableHeader
              selectable={selectable}
              setSelectedItems={setSelectedItems}
              column={columnsState}
              setSort={setSort}
              data={data}
              selectedItems={selectedItems}
              notSelectIf={notSelectIf}
              sortBy={sortBy}
            />
            <TableBody
              column={columnsState}
              data={data}
              selectable={selectable}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              notSelectIf={notSelectIf}
            />
          </table>
        </div>
      </div>
      <Paginations
        currentPage={currentPage}
        dataLength={dataLength}
        setPage={setPage}
        setSelectedItems={setSelectedItems}
        limit={page_size}
      />
    </>
  );
};

export default memo(Table);
